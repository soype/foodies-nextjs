

export async function login(formData){

    const user = { user: formData.get('user')};

    const expires = new Date(Date.now() + 10 * 1000);
    

}