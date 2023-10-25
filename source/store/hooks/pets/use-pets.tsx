import { createPet, getAllPets } from '~/services/helpers'
import { IPetV2 } from '~/types/pet-v2'
import useAppStore from '../use-app-store'

export const NAME = 'pets'

const usePetsByDocument = (
    document: string
) => {
    const superKeys = [NAME, document]

    return useAppStore<IPetV2>({
        get: getAllPets.bind(null, document),
        add: createPet,
        keys: superKeys,
        name: NAME,
        enabled: !!document,
    })
}

export default usePetsByDocument