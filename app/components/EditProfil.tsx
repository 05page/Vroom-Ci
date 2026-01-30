import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditProfilProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: () => void;
}

export function EditProfil({ open, onOpenChange, onSubmit }: EditProfilProps) {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit();
        }
        onOpenChange(false);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Mettez à jour votre profil à jour.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username-1">Username</Label>
                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Email</Label>
                        <Input id="name-1" name="email" type="email" defaultValue="john@gmail.com" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Téléphone</Label>
                        <Input id="name-1" name="name" defaultValue="07 03 19 52 29" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} type="submit" className="cursor-pointer">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
