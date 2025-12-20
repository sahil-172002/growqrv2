import { Navbar } from "@/components/ui/navbar"

const Demo = () => {
    // Example: Pass a no-op function or actual waitlist handler
    const handleWaitlist = () => {
        console.log('Waitlist clicked');
    };

    return (
        <>
            <Navbar onOpenWaitlist={handleWaitlist} />
        </>
    )
}

export { Demo }
