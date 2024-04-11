
import UserOwnerListComp from "./UserOwnerListComp";
export default function UserList() {

    return (
        <UserOwnerListComp
            thtypePostNom="Post-nom"
            thDecrEmail="E-mail"
            thStatusRole="Role"
        >

            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                <tr className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                            <div className="font-medium text-gray-700">Paulin</div>
                        </div>
                    </th>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full  text-xs font-semibold">
                        Lubamba
                        </span>
                    </td>
                    <td className="px-6 py-4">paulinlubamba@gmail.com</td>
                    <td className="px-6 py-4 ">
                        <div className="">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            Admin
                            </span>

                        </div>
                    </td>

                    <td className='flex gap-3 pl-6'>
                        <img src="../src/assets/images/eye.svg" alt="" />
                        <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
                    </td>

                </tr>
                {/*  */}
            </tbody>

        </UserOwnerListComp>
    );
}
