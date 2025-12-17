import { Navbar1 } from "@/components/ui/navbar-1"

const Demo = () => {
    // Example: Pass a no-op function or actual waitlist handler
    const handleWaitlist = () => {
        console.log('Waitlist clicked');
    };

    return (
        <>
            <Navbar1 onOpenWaitlist={handleWaitlist} />
        </>
    )
}

export { Demo }
