

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


