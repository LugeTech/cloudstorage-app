'use server'
export async function submitForm(formData: FormData) {
  const response = await fetch(process.env.API_PATH + "/submit-form", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    console.log("Form submitted successfully");
  } else {
  }
}
