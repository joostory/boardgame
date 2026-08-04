import { useAtom } from "jotai"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { gamesAtom } from "@/atom/modoo-atom"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ModooGame, ModooPlayer } from "@/domain/modoo"
import { getGame } from "@/storage/modoo-storage"

function makeStatisticData(item: ModooGame | null) {
  if (!item) {
    return null
  }
  let topPlayer: ModooPlayer | undefined
  if (item.topPlayerId) {
    topPlayer = item.players.find((it) => it.id === item.topPlayerId)
  } else if (item.players && item.players.length > 0) {
    topPlayer = [...item.players].sort((a, b) => b.money - a.money)[0]
  }
  return {
    topPlayer: topPlayer?.name ?? "알 수 없음",
    started: item.started,
  }
}

export default function GameStatistics() {
  const [games, _setGames] = useAtom(gamesAtom)

  const gameDetails = useMemo(() => {
    return games.map((it) => getGame(it.id))
  }, [games])

  const chartData = useMemo(() => {
    const playerMap: Record<string, number> = {}
    const datas = gameDetails.map(makeStatisticData)
    datas.forEach((it) => {
      if (it?.topPlayer) {
        playerMap[it.topPlayer] = (playerMap[it.topPlayer] || 0) + 1
      }
    })
    return Object.entries(playerMap).map(([name, value]) => ({
      name,
      value,
    }))
  }, [gameDetails])

  const chartConfig: ChartConfig = {
    value: {
      label: "승리수",
      color: "#666",
    },
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
          hide
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={4}>
          <LabelList
            dataKey="name"
            position="right"
            offset={24}
            width={200}
            className="fill-foreground"
            fontSize={12}
          />
          <LabelList
            dataKey="value"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
