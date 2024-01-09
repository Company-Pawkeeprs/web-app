import { KeyOfSpecies, Species } from '~/store/slices/pets/speciesType';
import { PetData } from '~/types/pet-v2';

type CardPetProps = {
    pet: PetData;
};

const CardPet = ({ pet }: CardPetProps) => {
    return (
        <section className="flex flex-col justify-center mb-2">
            <div className="gap-2 flex-wrap flex flex-col w-full justify-between">
                <p className="text-gray-500 flex justify-between">
                    <strong className="mr-2">Pet:</strong>
                    <span>
                        {`${pet.name_pet}, ${
                            Species[
                                pet.specie as Species as unknown as KeyOfSpecies
                            ]
                        }, ${pet.race as string}`}
                    </span>
                </p>
            </div>
        </section>
    );
};

export default CardPet;
