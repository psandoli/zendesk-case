async function openTicket(
  subject,
  detailing,
  accountName,
  requesterEmail,
  orderNumber,
  affectingAllUsers,
  transactionNumber,
  transactionStatus,
  paymentAcquirer,
  skuId
) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")

  let body = `<p><b>Account name:</b> ${accountName}</p>`

  switch (subject) {
    case "Orders": {
      body += `<p><b>Order number:</b> ${orderNumber}</p><p><b>Affecting all users:</b> ${
        affectingAllUsers ? "Yes" : "No"
      }</p>`

      break
    }
    case "Payments": {
      body += `<p><b>Transaction number:</b> ${transactionNumber}</p><p><b>Transaction status:</b> ${transactionStatus}</p><p><b>Payment Acquirer:</b> ${paymentAcquirer}</p>`

      break
    }
    case "Catalog": {
      body += `<p><b>SkuId:</b> ${skuId}</p>`

      break
    }
    default: {
      break
    }
  }

  body += `<p><b>Detailing:</b> ${detailing}</p>`

  const raw = JSON.stringify({
    subject,
    comment: {
      html_body: body,
    },
    requester: {
      email: requesterEmail,
    },
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  return await fetch("http://localhost:8000/ticket", requestOptions)
    .then((response) => {
      return response?.status === 200
    })
    .catch((error) => {
      console.error("error => ", error)
      return false
    })
}

export { openTicket }
