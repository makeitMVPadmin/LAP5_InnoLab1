
import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { STYLES } from "../../constants/styles"
import ClockRunner from "../../assets/images/finish-clock.svg"

const SubmissionModal = ({ handleSubmit }) => {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
        setOpen(false)
        handleSubmit()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button
                    className={`${STYLES.primaryButton}`}
                    aria-label="submit button to submit project"
                >
                    Submit Project
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[72rem] h-[42.5rem] border-black border-r-[5px] border-b-[5px] border-l-3 border-t-3 rounded-[20px]">
                <DialogHeader className="flex justify-center">
                    <div className="flex justify-center flex-col items-center">
                        <img className="h-72 w-72" src={ClockRunner} alt="clock almost at finish line" />
                        <DialogTitle className="font-gilroy font-bold text-3xl">Ready to submit your project?</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="flex justify-center">
                    <p className="font-gilroy font-bold text-2xl">Once you submit your project, you won't be able to change anything.</p>
                </div>
                <div className="gap-4 flex justify-center">
                    <Button className="font-bold text-black border-none bg-white font-gilroy text-xl" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className={`${STYLES.primaryButton}`} onClick={handleConfirm}>Submit Project</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SubmissionModal