import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data: cabins, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error("'Cabins could not be loaded'")
    }

    return cabins;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', "")
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // created cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.log(error)
        throw new Error("Cabins could not be loaded !")
    }

    // upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // delete the cabin if there was an error uploading image
    if (storageError) {
        await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id)

        console.log(storageError)
        throw new Error("Cabins image could not be uploaded !")
    }

    return data;
}

export async function deleteCabin(id) {

    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    return error
}
