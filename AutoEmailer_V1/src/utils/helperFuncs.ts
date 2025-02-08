export const largestPropinObjArray = (props: largestPropinObjArrayProps) => {
    
    
    
    const max = props.objArray.reduce((prev: { [x: string]: number }, current: { [x: string]: number }) => {
            return (prev && prev[props.property] > current[props.property] ? prev: current)
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
