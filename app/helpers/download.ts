import html2canvas from "html2canvas";

export default async function download({
  elementId,
  filename,
}: {
  elementId: string;
  filename: string;
}) {
  const container = document.getElementById(elementId);

  if (!container) return;

  const canvas = await html2canvas(container, {
    allowTaint: true,
    foreignObjectRendering: false,
    proxy: "/proxy",
  });
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.download = `${filename}.jpg`;
  link.href = canvas.toDataURL();
  link.target = "_blank";
  link.click();
}
