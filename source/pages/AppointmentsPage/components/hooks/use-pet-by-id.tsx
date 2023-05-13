import { useCallback, useEffect, useState, useTransition } from "react"
import { useAppSelector } from "~/store/hooks"
import { Pet } from "~/store/pets/types"

type UsePetByNameProps = {
    id?: string | null,
    onChangeField: (field: string, value: any) => void
}

const usePetById = ({ id, onChangeField }: UsePetByNameProps) => {

    const [isPending, startTransition] = useTransition()
    const [petExists, setPetExists] = useState(false)

    const pets = useAppSelector(state => state.Pets.pets)

    const onChangePet = useCallback((pet: Pet) => {
        startTransition(() => {
            onChangeField('pet.id', pet.id)
            onChangeField('pet.avatar', pet.avatar)
            onChangeField('pet.name', pet.name)
            onChangeField('pet.breed', pet.breed)
            onChangeField('pet.species', pet.species)
            onChangeField('pet.bloodType', pet.bloodType)
            onChangeField('pet.gender', pet.gender)
            onChangeField('pet.dateOfBirth', pet.dateOfBirth)

            setPetExists(true)
        })
    }, [onChangeField])

    useEffect(() => {
        if (!id) {
            return
        }

        const pet = pets?.find(pet => pet?.id === id)

        if (!pet) return

        onChangePet(pet)
    }, [pets, onChangePet, id])


    return {
        isPending,
        petExists
    }
}

export default usePetById