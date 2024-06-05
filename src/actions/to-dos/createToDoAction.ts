import {createToDoSchema} from "@/actions/to-dos/to-dosSchemas";
import {action} from "@/lib/safe-action";
import {doc, setDoc} from "@firebase/firestore";
import {db} from "@/lib/fireBase/firebase";

export const createToDoAction = action(createToDoSchema, async ({title, description, isPublic, deadline}) => {

        try {

            await setDoc(doc(db, "to-dos", title), {
                title: title,
                description: description,
                isPublic: isPublic,
                deadline: deadline
            });
            console.log("Document written with ID: " + title);

            return {success: {title: title, description: description, isPublic: isPublic, deadline: deadline}};
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)