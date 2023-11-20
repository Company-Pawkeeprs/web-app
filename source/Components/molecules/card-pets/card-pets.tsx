import MyImage from '~/Components/atoms/my-image/my-image';
import ravena from '~/assets/images/ravena.jpeg';

import { Pet } from '~/store/slices/pets/types';
import { RadioGroup } from '@headlessui/react';
import ViewAppointment from '~/Components/modals/view-appointment/modal-view-appointment';

type CardPetsProps = {
    pet: Pet
    checked: boolean
}

const CardPets = ({ pet, checked}: CardPetsProps) => {

    if (!pet) {
        return null;
    }

    return (
        <div className="space-y-10 w-full">
                <RadioGroup.Option
                  key={pet?.name_pet}
                  value={pet}
                  className={({ active }) =>
                    `${
                      active
                        ? 'ring-2 ring-white/20 ring-offset-2'
                        : ''
                    }
                    ${checked ? 'bg-primary-500 bg-opacity-60 text-white' : 'bg-white'}
                      relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                  }
                >
                    <>
                      <div className="flex flex-col w-full">
                        <div className="flex mobile:gap-3 justify-around items-center">
                            <MyImage
                                src={ravena}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                className="h-32 mt-3 w-32 rounded-full"
                            />
    
                          <div className="flex flex-col mobile:hidden items-center">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {'Informações Do Pet:'}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >   
                              <div className="p-2 ">
                                    <p className="text-gray-700">Nome do pet: {pet?.pet_data.name_pet}</p>
                                    <p className="text-gray-700">Especie: { pet?.pet_data.specie}</p>
                                    <p className="text-gray-700">Sexo: {pet?.pet_data.sex}</p>
                                </div>
                            </RadioGroup.Description>
                          </div>
                          <div className="flex mobile:hidden flex-col">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {'Informações Do Tutor:'}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >
                              <div className="p-2">
                                    <p className="text-gray-700">Nome: {pet?.tutor_data.email}</p>
                                    <p className="text-gray-700">Contato: {pet?.tutor_data.phone}</p>
                                </div>
                            </RadioGroup.Description>
                            
                          </div>
                        </div>
                        {checked && (
                          <div className="flex justify-end text-white">
                            <ViewAppointment props={pet} />
                          </div>
                        )}
                      </div>
                    </>
                </RadioGroup.Option>
            </div>
    )
}

export default CardPets