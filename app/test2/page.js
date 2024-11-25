"use client"

import { Theaters } from "@mui/icons-material"

export default function test2 () {

    const head = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10","t11","t12","t13","t14","t15","t16","t17","t18","t19","t20"]
    const line1 = [12321312312312312312312321,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const data = [
        line1,
        line1,
        line1
    ]
    console.log(data)
    return(
        <div>
            <table className="border-collapse border border-slate-400 table-auto">
                <thead>
                    <tr>
                        {
                            head.map(item =>
                                <th className="border border-slate-300 p-2 w-[50px] bg-red-500 text-white">
                                    <div className="w-[50px]">
                                        {
                                            item
                                        }
                                    </div>
                                </th>     
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(line =>
                            <tr>
                                {
                                    line.map(item =>
                                        <td className="border border-slate-300 p-2 w-[50px]">
                                            <div className="w-[50px] overflow-hidden">
                                                {
                                                    item
                                                }
                                            </div>
                                        </td>     
                                    )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}