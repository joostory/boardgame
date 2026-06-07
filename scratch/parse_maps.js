const fs = require('fs');
const path = require('path');

const xmlPath = '/Users/joo.yoon/workspace/joostory/boardgame/temp-gnome-mahjongg/data/maps/mahjongg.map';
const targetPath = '/Users/joo.yoon/workspace/joostory/boardgame/src/data/mahjonggData.ts';

if (!fs.existsSync(xmlPath)) {
  console.error('XML file not found at:', xmlPath);
  process.exit(1);
}

const content = fs.readFileSync(xmlPath, 'utf-8');

// Simple XML parsing using regex and string matching to avoid dependencies
const mapRegex = /<map\s+name="([^"]+)"\s+scorename="([^"]+)">([\s\S]*?)<\/map>/g;
const layerRegex = /<layer\s+z="([^"]+)">([\s\S]*?)<\/layer>/g;
const rowRegex = /<row\s+y="([^"]+)"\s+left="([^"]+)"\s+right="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/g;
const colRegex = /<column\s+x="([^"]+)"\s+top="([^"]+)"\s+bottom="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/g;
const blockRegex = /<block\s+left="([^"]+)"\s+right="([^"]+)"\s+top="([^"]+)"\s+bottom="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/g;
const tileRegex = /<tile\s+(?:z="([^"]+)"\s+)?x="([^"]+)"\s+y="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/g;

const maps = [];
let mapMatch;

while ((mapMatch = mapRegex.exec(content)) !== null) {
  const name = mapMatch[1];
  const scorename = mapMatch[2];
  const mapBody = mapMatch[3];
  
  const slots = [];
  
  // A helper to add a slot only if it doesn't already exist
  const addSlot = (x, y, z) => {
    if (!slots.some(s => s.x === x && s.y === y && s.z === z)) {
      slots.push({ x, y, z });
    }
  };
  
  // We need to parse layers and independent elements.
  // We can parse line by line to keep layer_z context
  const lines = mapBody.split('\n');
  let currentLayerZ = 0;
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // Check for layer start
    const layerStart = /<layer\s+z="([^"]+)">/.exec(line);
    if (layerStart) {
      currentLayerZ = parseInt(layerStart[1], 10);
      continue;
    }
    
    // Check for layer end
    if (line.includes('</layer>')) {
      currentLayerZ = 0;
      continue;
    }
    
    // 1. row
    const rowMatch = /<row\s+y="([^"]+)"\s+left="([^"]+)"\s+right="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/.exec(line);
    if (rowMatch) {
      const y = Math.round(parseFloat(rowMatch[1]) * 2);
      const left = Math.round(parseFloat(rowMatch[2]) * 2);
      const right = Math.round(parseFloat(rowMatch[3]) * 2);
      const z = rowMatch[4] !== undefined ? parseInt(rowMatch[4], 10) : currentLayerZ;
      for (let x = left; x <= right; x += 2) {
        addSlot(x, y, z);
      }
      continue;
    }
    
    // 2. column
    const colMatch = /<column\s+x="([^"]+)"\s+top="([^"]+)"\s+bottom="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/.exec(line);
    if (colMatch) {
      const x = Math.round(parseFloat(colMatch[1]) * 2);
      const top = Math.round(parseFloat(colMatch[2]) * 2);
      const bottom = Math.round(parseFloat(colMatch[3]) * 2);
      const z = colMatch[4] !== undefined ? parseInt(colMatch[4], 10) : currentLayerZ;
      for (let y = top; y <= bottom; y += 2) {
        addSlot(x, y, z);
      }
      continue;
    }
    
    // 3. block
    const blockMatch = /<block\s+left="([^"]+)"\s+right="([^"]+)"\s+top="([^"]+)"\s+bottom="([^"]+)"(?:\s+z="([^"]+)")?\s*\/>/.exec(line);
    if (blockMatch) {
      const left = Math.round(parseFloat(blockMatch[1]) * 2);
      const right = Math.round(parseFloat(blockMatch[2]) * 2);
      const top = Math.round(parseFloat(blockMatch[3]) * 2);
      const bottom = Math.round(parseFloat(blockMatch[4]) * 2);
      const z = blockMatch[5] !== undefined ? parseInt(blockMatch[5], 10) : currentLayerZ;
      for (let x = left; x <= right; x += 2) {
        for (let y = top; y <= bottom; y += 2) {
          addSlot(x, y, z);
        }
      }
      continue;
    }
    
    // 4. tile
    // can match <tile z="4" x="6.5" y="3.5"/> or <tile x="6.5" y="3.5" z="4"/> or <tile x="0" y="3.5"/>
    let tileZ = currentLayerZ;
    let xVal, yVal;
    
    const zAttrMatch = /\bz="([^"]+)"/.exec(line);
    if (zAttrMatch) {
      tileZ = parseInt(zAttrMatch[1], 10);
    }
    
    const xAttrMatch = /\bx="([^"]+)"/.exec(line);
    const yAttrMatch = /\by="([^"]+)"/.exec(line);
    
    if (xAttrMatch && yAttrMatch) {
      xVal = Math.round(parseFloat(xAttrMatch[1]) * 2);
      yVal = Math.round(parseFloat(yAttrMatch[1]) * 2);
      addSlot(xVal, yVal, tileZ);
    }
  }
  
  maps.push({
    name,
    scorename,
    slots
  });
}

// Generate the TypeScript file content
let tsContent = `// Auto-generated from gnome-mahjongg XML map file
export interface MapSlot {
  x: number;
  y: number;
  z: number;
}

export interface MahjonggMap {
  name: string;
  scorename: string;
  slots: MapSlot[];
}

export const MAHJONGG_MAPS: MahjonggMap[] = ${JSON.stringify(maps, null, 2)};
`;

fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log(`Successfully generated ${maps.length} maps inside ${targetPath}`);
console.log('Map slot counts:');
maps.forEach(m => console.log(`- ${m.name}: ${m.slots.length} tiles`));
