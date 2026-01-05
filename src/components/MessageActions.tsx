import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, Edit, Trash2, Copy, Check } from "lucide-react";

interface MessageActionsProps {
  messageId: string;
  content: string;
  isOwn: boolean;
  onEdit: (id: string, newContent: string) => void;
  onDeleteForMe: (id: string) => void;
  onDeleteForAll: (id: string) => void;
}

export function MessageActions({
  messageId,
  content,
  isOwn,
  onEdit,
  onDeleteForMe,
  onDeleteForAll,
}: MessageActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    onEdit(messageId, editedContent);
    setShowEditDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isOwn ? "end" : "start"} className="rounded-xl w-48">
          <DropdownMenuItem onClick={handleCopy} className="font-medium cursor-pointer">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </>
            )}
          </DropdownMenuItem>
          
          {isOwn && (
            <>
              <DropdownMenuItem 
                onClick={() => setShowEditDialog(true)} 
                className="font-medium cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDeleteForMe(messageId)} 
                className="font-medium cursor-pointer text-orange-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer pour moi
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)} 
                className="font-medium cursor-pointer text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer pour tous
              </DropdownMenuItem>
            </>
          )}
          
          {!isOwn && (
            <DropdownMenuItem 
              onClick={() => onDeleteForMe(messageId)} 
              className="font-medium cursor-pointer text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer pour moi
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">Modifier le message</DialogTitle>
            <DialogDescription>
              Modifiez le contenu de votre message
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-24 rounded-xl"
          />
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              className="rounded-xl font-bold"
            >
              Annuler
            </Button>
            <Button onClick={handleEdit} className="rounded-xl font-bold">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">Supprimer pour tous ?</DialogTitle>
            <DialogDescription>
              Ce message sera supprimé définitivement pour tous les participants de la conversation.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="rounded-xl font-bold"
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDeleteForAll(messageId);
                setShowDeleteDialog(false);
              }}
              className="rounded-xl font-bold"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
