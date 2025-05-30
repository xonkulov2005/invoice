const baseURL = import.meta.env.VITE_BASE_URL;

export async function getInvoices(route = "/invoices", query = "") {
  const req = await fetch(baseURL + route + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Get invoice by ID
export async function getInvoice(route = "invoices", id) {
  const req = await fetch(baseURL + route + `/${id}`);
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Delete invoice by ID
export async function deleteById(id) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return "success";
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Update invoice by ID
export async function updateById(id, newData) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Add
export async function addInvoice(data) {
  console.log(data);
  const req = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Server error: :(");
  }
}
