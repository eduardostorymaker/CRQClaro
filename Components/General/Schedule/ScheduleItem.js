import Link from "next/Link";

export default function ScheduleItem ({ name, img, link}) {

    return (
        <Link href={link} target='_blank' className="rounded-xl shadow-lg shadow-red-500/50 overflow-hidden" >
            <div>
                <p className="p-2 text-red-500">
                    {name}
                </p>
                <figure className="flex justify-center">
                    <img src={img} />
                </figure>
            </div>
        </Link>
    )
}