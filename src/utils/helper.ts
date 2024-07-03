import config from "../config/config.json";

export type mdContent = {
  url: string | undefined;
  content: string;
};

export async function fetchJsonData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

export async function extractTags(url: string): Promise<void> {
  const jsonData = await fetchJsonData(url);
  console.log(jsonData);

  // if (jsonData && jsonData.developerNotes && jsonData.developerNotes.tags) {
  //   const tags = jsonData.developerNotes.tags;
  //   console.log("Tags:", tags);
  //   return getSubMenus(jsonData.developerNotes[buttonItem.name], buttonItem);

  //   // Here  you can process the tags as needed
  // } else {
  //   console.log("No tags found or incorrect JSON structure.");
  // }
}

export type buttonItem = {
  name: string;
  description?: string;
  link?: string;
  bgColor?: string;
  textColor?: string;
  bgColorDesc?: string;
  textColorDesc?: string;
};
export async function getMenu(): Promise<buttonItem[]> {
  const jsonData = await fetchJsonData(
    "https://raw.githubusercontent.com/jpothanc/developer-notes/main/index/index.json"
  );
  if (!jsonData) return [];
  console.log(jsonData);
  return jsonData.developerNotes.tags;
}

export async function getContentUrl(
  topic: string,
  subTopic: string | null
): Promise<string> {
  let jsonData = await fetchJsonData(getIndexFile());
  if (!jsonData) return "";

  if (subTopic == null || subTopic == "") {
    const filteredItems: buttonItem[] = jsonData.developerNotes.tags.filter(
      (x: buttonItem) => x.name == topic
    );
    const item =
      filteredItems.length > 0 ? filteredItems[0] : { name: "", link: "" };
    return getUrl(item.link);
  }

  const selectedMenu = getSubMenuItem(jsonData.developerNotes[topic], subTopic);
  return getUrl(selectedMenu.link);
}

export async function getSubMenu(
  buttonItem: buttonItem
): Promise<buttonItem[]> {
  let jsonData = await fetchJsonData(getIndexFile());
  if (!jsonData) return [];
  console.log(jsonData);

  if (
    buttonItem.name == "web" ||
    buttonItem.name == "java" ||
    buttonItem.name == ".net" ||
    buttonItem.name == "python" ||
    buttonItem.name == "azure" ||
    buttonItem.name == "architecture" ||
    buttonItem.name == "javascript" ||
    buttonItem.name == "testing" ||
    buttonItem.name == "design patterns" ||
    buttonItem.name == "others"
  )
    return getSubMenus(jsonData.developerNotes[buttonItem.name], buttonItem);
  return [];
}

function getSubMenuItem(items: buttonItem[], submenu: string): buttonItem {
  var filteredItems = items.filter((item) => item.name == submenu);
  return filteredItems.length > 0 ? filteredItems[0] : { name: "", link: "" };
}

async function getSubMenus(
  items: buttonItem[],
  buttonItem: buttonItem
): Promise<buttonItem[]> {
  return items.map((item) => {
    return {
      ...item,
      link: getUrl(item.link),
      bgColor: buttonItem.bgColor,
      textColor: buttonItem.textColor,
    };
  });
}

export function getUrl(url: string | any): string {
  if (url.startsWith("http")) return url;
  return config.app.contentBaseUrl + url;
}

export function getIndexFile(): string {
  return config.app.contentBaseUrl + config.app.indexFile;
}
