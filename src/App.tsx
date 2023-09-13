import "./App.css";
import { Contact } from "./models/contact.model.ts";
import {
	useAddContactMutation,
	useContactQuery,
	useContactsQuery,
	useDeleteContactMutation,
	useUpdateContactMutation,
} from "./services/contactsApi.tsx";

function App() {
	const { data, error, isLoading, isFetching, isSuccess } =
		useContactsQuery();

	return (
		<div className="App">
			<h1>React Redux Toolkit RTK Query Practice</h1>
			{isLoading && <div>Loading...</div>}
			{isFetching && <div>Fetching...</div>}
			{error && <div>Something went wrong</div>}
			{isSuccess && (
				<div>
					<h2>Contacts</h2>
					{data?.map((contact: Contact) => (
						<div className="data" key={contact.id}>
							<span>{contact.name}</span>
							<span>
								<ContactDetail id={contact.id} />
							</span>
						</div>
					))}
				</div>
			)}
			<div>
				<AddContact />
			</div>
		</div>
	);
}

const ContactDetail = ({ id }: { id: string }) => {
	const { data } = useContactQuery(id);
	return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

const AddContact = () => {
	const [addContact] = useAddContactMutation();
	const [updateContact] = useUpdateContactMutation();
	const [deleteContact] = useDeleteContactMutation();
	//for manual refresh after update in db
	// const {refetch}=useContactsQuery();
	const contact = {
		id: "10",
		name: "John Doe",
		email: "john@gmail.com",
	};

	const contactUpdate = {
		id: "10",
		name: "John Doe Updated",
		email: "john@gmail.com",
	};

	const addHandler = async () => {
		await addContact(contact);
		// refetch();
	};
	const updateHandler = async () => {
		await updateContact(contactUpdate);
		// refetch();
	};
	const deleteHandler = async () => {
		await deleteContact(contact.id);
		// refetch();
	};
	return (
		<div>
			<h2>Add Contact</h2>
			<button type="button" onClick={addHandler}>
				Add Contact
			</button>
			<button type="button" onClick={updateHandler}>
				Update Contact
			</button>
			<button type="button" onClick={deleteHandler}>
				Delete Contact
			</button>
		</div>
	);
};
export default App;
