'use server'
export async function submitForm(formData: FormData) {
  const response = await fetch("/api/submit-form/", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
  } else {
  }
}
