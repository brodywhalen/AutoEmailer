export const largestPropinObjArray = (props: largestPropinObjArrayProps) => {
    
    
    
    const max = props.objArray.reduce((prev: { [x: string]: number }, current: { [x: string]: number }) => {
        console.log('accumulator: ',prev[props.property])    
        return (prev[props.property] > current[props.property] ? prev[props.property]: current[props.property])
        }
    )

    return(max)



}

interface largestPropinObjArrayProps {
    objArray: myObj
    property: string
}
interface myObj{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key:string]: any
}
