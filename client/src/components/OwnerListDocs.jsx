
export default function OwnerListDocs() {


    return (
        <div className="">
            <div className="overflow-hidden border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nom</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Type</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Decription</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        <tr className="hover:bg-gray-50">
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">

                                <div className="text-sm">
                                    <div className="font-medium text-gray-700">Joël MPUNGA</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 rounded-full  text-xs font-semibold">
                                    Personne
                                </span>
                            </td>
                            <td className="px-6 py-4">Ce proprietaire est un client de Lubumbashi qui travaille en collaboration avec nous.</td>
                            <td className="px-6 py-4 ">
                                <div className="">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                        Actif
                                    </span>

                                </div>
                            </td>

                            <td className='flex gap-3'>
                                <img src="../src/assets/images/eye.svg" alt="" />
                                <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                                <img src="../src/assets/images/download-alt.svg" alt="" />
                            </td>

                        </tr>
                        {/*  */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
