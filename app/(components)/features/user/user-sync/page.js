"use client"

import { postUser } from "@/services/user/postUsre"
import { useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"

export default function UserSync() {
    const {isSignedIn, isLoaded} = useUser()

    const hasSynced = useRef(false)

    useEffect(()=> {
        async function syncUser() {
            try {
                hasSynced.current = true
                const result = await postUser()

                if(result.success) {
                    console.log("User sync successful: ", result.user)
                } else {
                    console.error("User sync failed: ", result.error)
                    hasSynced.current = false
                }
            } catch (error) {
                console.error("Error syncing user: ", error)
                hasSynced.current = false
            }
        }

        if(isLoaded && isSignedIn && !hasSynced.current) {
            syncUser()
        }
    }, [isSignedIn, isLoaded])
  return null
}
