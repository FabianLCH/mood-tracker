import { useState, useEffect, useCallback } from "react"

export const useWindowVisibility = () => {
    const [isWindowVisible, setWindowVisible] = useState(true)

    const handleVisibilityChange = useCallback(() => {
        setWindowVisible(document.visibilityState === "visible")
    }, [])

    useEffect(() => {
        window.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [handleVisibilityChange])

    return isWindowVisible
}