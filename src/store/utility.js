export const updateObject = (oldobj, updatedProp) => {
    return{
        ...oldobj,
        ...updatedProp
    }
}