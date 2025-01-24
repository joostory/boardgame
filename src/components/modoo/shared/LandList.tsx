import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { buildingsAtom, landsAtom, selectedBuildingsAtom } from "@/atom/modoo-atom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getLandColorBgClass, ModooBuilding, ModooLand } from "@/domain/modoo"
import { cn } from "@/lib/utils"
import { sum } from "@/utils/math"
import { toNumberFormat } from "@/utils/numberformat"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

function LandItem({land, onSelect}: {land: ModooLand, onSelect: {(land: ModooLand): void}}) {
  return (
    <Button variant={'outline'} className={cn("py-1 px-2 shadow-xs rounded text-slate-900", getLandColorBgClass(land.color))} onClick={() => onSelect(land)}>
      {land.name}
    </Button>
  )
}

function ContentItem({label, children}: {label: string, children: ReactNode}) {
  return (
    <div className="grid grid-cols-4 py-1">
      <div className="pr-4 text-right">{label}</div>
      <div className="col-span-3">{children}</div>
    </div>
  )
}

function LandCard({land}: {land: ModooLand}) {
  const allBuildings = useAtomValue(buildingsAtom)
  const [selectedBuildings, setSelectedBuildings] = useAtom(selectedBuildingsAtom)
  const buildings = useMemo(() => {
    return allBuildings.filter(it => it.landid == land.id)
  }, [land, allBuildings])
  const buildingCost = useMemo(() => {
    const currentBuildings = selectedBuildings.filter(it => it.landid == land.id)
    let tollfee = currentBuildings.map(it => it.tollfee).reduce(sum, 0)
    if (land.type != 'city') {
      tollfee = currentBuildings.length > 0 ? currentBuildings.map(it => it.tollfee).sort((a, b) => b - a)[0] : 0
    }
    return {
      constcost: currentBuildings.map(it => it.constcost).reduce(sum, 0),
      tollfee: tollfee,
      acquisitioncost: currentBuildings.map(it => it.acquisitioncost).reduce(sum, 0),
      sellingcost: currentBuildings.map(it => it.sellingcost).reduce(sum, 0),
      inacquisitionable: currentBuildings.findIndex(it => !it.acquisitionable) >= 0,
    }

  }, [land, selectedBuildings])

  function handleToggleBuilding(building: ModooBuilding) {
    if (selectedBuildings.findIndex(it => it.id == building.id) >= 0) {
      setSelectedBuildings(selectedBuildings.filter(it => it.id != building.id))
    } else {
      setSelectedBuildings([...selectedBuildings, building])
    }
  }

  const bgClass = getLandColorBgClass(land.color)

  return (
    <div className={cn("rounded shadow-sm bg-opacity-10", bgClass)}>
      <div className={cn("px-4 py-2 rounded-t text-slate-900 font-bold text-lg", bgClass)}>
        {land.name}
      </div>
      <div className="rounded-b py-4 px-4">
        <div className="flex flex-wrap gap-2">
          {buildings.map(b =>
            <Button key={b.id} variant={selectedBuildings.findIndex(it => it.id == b.id) >= 0? 'primary' : 'outline'} onClick={() => handleToggleBuilding(b)}>
              {b.name}
            </Button>
          )}
        </div>

        <div className="my-3">
          <ContentItem label="건설비용">
            {toNumberFormat(buildingCost.constcost)}
          </ContentItem>
          <ContentItem label="통행료">
            {toNumberFormat(buildingCost.tollfee)}
          </ContentItem>
          <ContentItem label="인수비용">
            <div className="flex flex-wrap gap-2">
              <span>{toNumberFormat(buildingCost.acquisitioncost)}</span>
              {buildingCost.inacquisitionable &&
                <Badge variant={'destructive'}>인수불가</Badge>
              }
            </div>
          </ContentItem>
          <ContentItem label="매각비용">
            {toNumberFormat(buildingCost.sellingcost)}
          </ContentItem>
        </div>
      </div>
    </div>
  )
}

export default function LandList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [lands, setLands] = useAtom(landsAtom)
  const setBuildings = useSetAtom(buildingsAtom)
  const [selectedLand, setSelectedLand] = useState<ModooLand>()

  async function loadData() {
    const landResponse = await axios.get("/modoo/api/land")
    const buildingResponse = await axios.get("/modoo/api/building")

    setLands(landResponse.data)
    setBuildings(buildingResponse.data)
  }

  useEffect(() => {
    if (lands.length == 0) {
      setLoading(true)
      loadData().finally(() => setLoading(false))
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <ReloadIcon className="animate-spin h-6 w-6 opacity-70" />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {lands.map(it => <LandItem key={it.id} land={it} onSelect={setSelectedLand} />)}
      </div>

      {selectedLand &&
        <div className="mt-6">
          <LandCard land={selectedLand} />
        </div>
      }
    </>
  )
}
