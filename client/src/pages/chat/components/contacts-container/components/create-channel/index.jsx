import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input";
  import Lottie from "react-lottie";
  import { apiClient } from "@/lib/api-client";
  import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar , AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";

const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData} = useAppStore();
    const [openNewContactModal, setOpenNewContactModal]= useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(
                    SEARCH_CONTACTS_ROUTES,
                    { searchTerm },
                    { withCredentials: true}
                );
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts); return
                }
            } else {
                setSearchedContacts([]); 
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const selectNewContact = (contact) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    };

  return (
  <>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
        onClick={() => setOpenNewContactModal(true)} />
    </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
    Select New Contact
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
  <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
    <DialogHeader>
      <DialogTitle>
      Please select a contact
      </DialogTitle>
    </DialogHeader>
    <div>
        <Input 
        placeholder="Search Contacts"
        className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
        onChange={(e) => searchContacts(e.target.value)}
        />
    </div>
  </DialogContent>
</Dialog>
  </>
  );
}; 

export default CreateChannel;
