
import JigsawGame from "@/components/jigsaw/JigsawGame";

export default function JigsawPage() {
    return (
        <div className="container mx-auto py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">직소 퍼즐 (Jigsaw Puzzle)</h1>
            <JigsawGame />
        </div>
    );
}
