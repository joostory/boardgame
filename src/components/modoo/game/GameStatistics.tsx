
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { gamesAtom } from "@/atom/modoo-atom"
import { getGame } from "@/storage/modoo-storage"


function makeStatisticData(item: any) {
  const topPlayerId = item.topPlayerId
  let topPlayer
  if (item.topPlayerId) {
    topPlayer = item.players.find((it: any) => it.id == item.topPlayerId)
  } else {
    topPlayer = item.players.sort((a: any, b: any) => a.money > b.money)[0]
  }
  return {
    topPlayer: topPlayer.name,
    started: item.started,
  }
}


export default function GameStatistics() {
  const [games, setGames] = useAtom(gamesAtom)
  const [gameDetails, setGameDetails] = useState<any>([])
  const [chartData, setChartData] = useState<any>([])
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})

  useEffect(() => {
    const list = games.map(it => getGame(it.id))
    setGameDetails(list)
    const playerMap: any = {}
    const datas = list.map(makeStatisticData)
    datas.forEach(it => {
      if (playerMap[it.topPlayer]) {
        playerMap[it.topPlayer] += 1
      } else {
        playerMap[it.topPlayer] = 1
      }
    })
    setChartData(Object.entries(playerMap).map((entry) => {
      return {
        name: entry[0],
        value: entry[1]
      }
    }))

  }, [games])

  useEffect(() => {
    setChartConfig({
      value: {
        label: "승리수",
        color: "#666",
      }
    })
  }, [])


  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout='vertical'
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
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={4}
        >
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
