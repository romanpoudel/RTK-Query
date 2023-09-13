import './App.css'
import { useContactQuery, useContactsQuery } from './services/contactsApi'

function App() {
const {data,error,isLoading,isFetching,isSuccess}=useContactsQuery();

  return (
    <div className='App'>
      <h1>React Redux Toolkit RTK Query Practice</h1>
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {error && <div>Something went wrong</div>}
      {isSuccess && (
        <div>
          <h2>Contacts</h2>
            {data?.map((contact) => (
              <div className='data' key={contact.id}>
                <span>{contact.name}</span>
                <span><ContactDetail id={contact.id}/></span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

const ContactDetail=({id}:{id:string})=>{
  const {data}=useContactQuery(id); 
  return (
    <pre>{JSON.stringify(data,undefined,2)}</pre>
  )
}


export default App
