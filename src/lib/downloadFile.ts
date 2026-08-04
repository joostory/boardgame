export function downlaodFile(data: string) {
  const downloadUrl = window.URL.createObjectURL(
    new Blob([data], { type: "application/json" }),
  )
  const link = document.createElement("a")
  link.href = downloadUrl
  link.setAttribute("download", "modoo-gamedata.json")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(downloadUrl)
}
