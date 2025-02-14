import { DepartmentResponse } from "./types";

const END_POINT =
  "https://boards-api.greenhouse.io/v1/boards/newtonresearch/departments";

document.addEventListener("DOMContentLoaded", async () => {
  const jobWrap = document.querySelector(`[dev-target=jobs-wrap]`);
  const jobTemplate = document.querySelector(`[dev-target=job-template]`);
  const jobLoader = document.querySelector(`[dev-target=job-loader]`);

  if (!jobWrap || !jobTemplate || !jobLoader)
    return console.error(`No job wrap, jobLoader or job template found`);

  const { data, error } = await getPositions();
  console.log({ data });
  if (data) {
    jobWrap.innerHTML = "";
    jobLoader.setAttribute("dev-hide", "true");
    jobWrap.setAttribute("dev-hide", "false");
    data.departments
      .map(({ jobs }) => jobs)
      .flat()
      .map(({ absolute_url, location, title }) => ({
        absolute_url,
        location,
        title,
      }))
      .forEach(({ absolute_url, location, title }) => {
        const item = jobTemplate.cloneNode(true) as HTMLDivElement;
        const name = item.querySelector(`[dev-target=title]`);
        const link = item.querySelector<HTMLLinkElement>(`[dev-target=link]`);
        const locationDiv = item.querySelector(`[dev-target=location]`);
        const description = item.querySelector(`[dev-target=description]`);
        if (name) name.textContent = title;
        if (link) link.href = absolute_url;
        if (locationDiv) locationDiv.textContent = location.name;
        if (description) description.textContent = "";
        jobWrap.appendChild(item);
      });
  }
  if (error) {
    console.error("Error fetching positions", error);
  }

  async function getPositions() {
    try {
      const res = await fetch(END_POINT);
      const data: DepartmentResponse = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
});
