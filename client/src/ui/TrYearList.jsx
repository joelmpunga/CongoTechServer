import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LinesEllipsis from 'react-lines-ellipsis';
import { useMyContext } from '../contexts/MyContext';
import ContainerFolderFile from './ContainerFolderFile';
import Modal from './Modal';

export default function TrYearList({ year, id }) {
    const setEnCours = async () => {
        const confirmation = await Swal.fire({
          title: 'Confirmation',
          text: 'Etes vous sur de vouloir definir cette année comme année en cours ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Annuler'
        });
    
        if (confirmation.isConfirmed) {
          try {
            const response = await axios.post(`http://localhost:3000/years/encours/${id}`);
            if (response.status === 200) {
              await Swal.fire('Succès', 'Défini avec succès!', 'success');
              navigate(actualUrl);
            } else {
              await Swal.fire('Erreur', 'Une erreur est survenue lors de la definition en cours', 'error');
            }
          } catch (error) {
            console.error('Error deleting file:', error);
        }
        } else {
          await Swal.fire('Action annulée', '', 'info');
        }
      }
      const setCloturer = async () => {
        const confirmation = await Swal.fire({
          title: 'Confirmation',
          text: 'Etes vous sur de vouloir cloturer cette année ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'Annuler'
        });
    
        if (confirmation.isConfirmed) {
          try {
            const response = await axios.post(`http://localhost:3000/years/cloturer/${id}`);
            if (response.status === 200) {
              await Swal.fire('Succès', 'Cloturée avec succès!', 'success');
              navigate(actualUrl);
            } else {
              await Swal.fire('Erreur', 'Une erreur est survenue lors de la cloture', 'error');
            }
          } catch (error) {
            console.error('Error deleting file:', error);
          }
        } else {
          await Swal.fire('Action annulée', '', 'info');
        }
      };
return (
<tr className="hover:bg-gray-50" key={year.id}>
    <td className="px-6 py-4 ">
        <div className="">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                {year.debut.split('-')[0]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
                {year.fin.split('-')[0]}
            </span>
        </div>
    </td>
    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="text-sm">
            <div className="font-medium text-gray-700">{year.debut.split('T')[0]}</div>
        </div>
    </td>
    <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  text-xs font-semibold">
            {year.fin.split('T')[0]}
        </span>
    </td>
    <td className='flex gap-3 pl-6'>
        {
            year.isEnCours == 1 ?
            <button onClick={setCloturer}>
                <img src="../src/assets/images/icons8-trash.gif" alt="" />
            </button> : 
            <button onClick={setEnCours}>
                <img src="../src/assets/images/icons8-check.svg" alt=""/>
            </button>
        }
        
    </td>
    <td className='pl-6'>
        {
            year.isEnCours ? <img src="../src/assets/images/icons8-check.gif" alt="" /> : ''
        }
    </td>
</tr>
)
}