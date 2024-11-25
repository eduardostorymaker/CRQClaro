import ProviderContactItem from "./ProviderContactItem";

export default function ProviderContactGroup ({ providerDataFiltered,canEdit }) {

    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4" >
            {
                providerDataFiltered.map(item =>
                    <ProviderContactItem
                        canEdit={canEdit}
                        key={item.id}
                        id={item.id}
                        provider={item.provider}
                        subject={item.subject}
                        to={item.to}
                        cc={item.cc}
                        body={item.body}
                        phone={item.phone}
                        type={item.type}
                    />    
                )
            }
        </div>
    )
}