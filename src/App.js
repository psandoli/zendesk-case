import { useState } from "react"
import Input from "@vtex/styleguide/lib/Input"
import Button from "@vtex/styleguide/lib/Button"
import Textarea from "@vtex/styleguide/lib/Textarea"
import Dropdown from "@vtex/styleguide/lib/Dropdown"
import Checkbox from "@vtex/styleguide/lib/Checkbox"
import Alert from "@vtex/styleguide/lib/Alert"
import "vtex-tachyons"
import { openTicket } from "./services/zendesk.js"
import "./App.css"

function App() {
  const [accountName, setAccountName] = useState("")
  const [requesterEmail, setRequesterEmail] = useState("")
  const [subject, setSubject] = useState("Others")
  const [detailing, setDetailing] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [affectingAllUsers, setAffectingAllUsers] = useState(false)
  const [transactionNumber, setTransactionNumber] = useState("")
  const [transactionStatus, setTransactionStatus] = useState("")
  const [paymentAcquirer, setPaymentAcquirer] = useState("")
  const [skuId, setSkuId] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = async () => {
    const ticketOpened = await openTicket(
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
    )

    setSuccess(ticketOpened)
    setError(!ticketOpened)
    setAccountName("")
    setRequesterEmail("")
    setSubject("Others")
    setDetailing("")
    setOrderNumber("")
    setAffectingAllUsers(false)
    setTransactionNumber("")
    setTransactionStatus("")
    setPaymentAcquirer("")
    setSkuId("")
  }

  return (
    <div className="app pa7">
      <div className="mb5 w-100">
        <Input
          label="Account Name"
          onChange={(e) => setAccountName(e.target.value)}
          value={accountName}
          required
        />
      </div>
      <div className="mb5 w-100">
        <Input
          label="Requester Email"
          onChange={(e) => setRequesterEmail(e.target.value)}
          value={requesterEmail}
          required
        />
      </div>
      <div className="mb5 w-100">
        <Dropdown
          label="Placeholder"
          placeholder="Select an artist"
          options={[
            { value: "Orders", label: "Orders" },
            { value: "Payments", label: "Payments" },
            { value: "Catalog", label: "Catalog" },
            { value: "Others", label: "Others" },
          ]}
          value={subject}
          onChange={(_, v) => setSubject(v)}
        />
      </div>
      {subject === "Orders" ? (
        <>
          <div className="mb5 w-100">
            <Input
              label="Order number"
              onChange={(e) => setOrderNumber(e.target.value)}
              value={orderNumber}
              required
            />
          </div>
          <div className="mb5 w-100 f5">
            <Checkbox
              checked={affectingAllUsers}
              id="option-0"
              label="Affecting all users?"
              name="default-checkbox-group"
              onChange={(e) => setAffectingAllUsers(!affectingAllUsers)}
              value="option-0"
            />
          </div>
        </>
      ) : subject === "Payments" ? (
        <>
          <div className="mb5 w-100">
            <Input
              label="Transaction Number"
              onChange={(e) => setTransactionNumber(e.target.value)}
              value={transactionNumber}
              required
            />
          </div>
          <div className="mb5 w-100">
            <Input
              label="Transaction Status"
              onChange={(e) => setTransactionStatus(e.target.value)}
              value={transactionStatus}
              required
            />
          </div>
          <div className="mb5 w-100">
            <Input
              label="Payment Acquirer"
              onChange={(e) => setPaymentAcquirer(e.target.value)}
              value={paymentAcquirer}
              required
            />
          </div>
        </>
      ) : subject === "Catalog" ? (
        <>
          <div className="mb5 w-100">
            <Input
              label="SkuId"
              onChange={(e) => setSkuId(e.target.value)}
              value={skuId}
              required
            />
          </div>
        </>
      ) : null}
      <div className="mb5 w-100">
        <Textarea
          label="Detailing"
          onChange={(e) => setDetailing(e.target.value)}
          value={detailing}
        />
      </div>
      <div className="mb5 pt2">
        <Button size="small" onClick={handleClick}>
          Open ticket
        </Button>
      </div>
      {success && (
        <div className="mb5 pt2">
          <Alert type="success">Your ticket was opened successfully.</Alert>
        </div>
      )}
      {error && (
        <div className="mb5 pt2">
          <Alert type="error">
            Oops! There was an error opening your ticket. Please, double check
            your information and try again.
          </Alert>
        </div>
      )}
    </div>
  )
}

export default App
