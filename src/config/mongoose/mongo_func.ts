export const createOneUser = async (data: {
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
}) => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        imageUrl: data.imageUrl,
        clerkId: data.clerkId,
        name: data.name,
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export async function getAllPodcasts({
  page = "",
  podcastId = "",
}: {
  page: string;
  podcastId: string;
}) {
  try {
    let res: any;
    if (podcastId !== "") {
      res = await fetch("/api/podcast?r=" + podcastId);
    }
    if (page != "") {
      res = await fetch("/api/podcast?p=" + page);
    }
    const data = await res.json();
    const result = data.data;
    console.log("From mongo_func.ts", result);
    return result;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
  }
}

export async function updatePodcastViews(podcastId: string) {
  try {
    const res = await fetch(`/api/podcast`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        podcastId,
      }),
    });
    let updatedPodcast = await res.json();
    console.log(updatedPodcast);
    return updatedPodcast;
  } catch (error) {
    console.error("Error updating podcast views:", error);
  }
}
