import React, { useState } from "react"
import { Button } from "react-native"
import {
  requestBillingAgreement,
  PaypalButton,
} from "@bounceapp/react-native-paypal"

export default function App() {
  const [loading, setLoading] = useState(false)

  const onPress = async () => {
    const res = await requestBillingAgreement({
      clientToken: "CLIENT_TOKEN",
    })

    if (res?.error) {
      console.error(res?.error)
      return
    }

    setLoading(false)
  }

  return <PaypalButton onPress={onPress} disabled={loading} />
}
