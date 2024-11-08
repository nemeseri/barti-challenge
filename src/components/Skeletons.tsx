import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CardSkeleton() {
  return (<Skeleton 
    containerClassName="skeleton-card" 
    baseColor='#ddd' 
    highlightColor='#f5f5f5' 
    width={248} height={248} />)
}

export function BlockSkeleton() {
  return (<Skeleton 
    containerClassName='skeleton-block'
    baseColor='#ddd' 
    highlightColor='#f5f5f5' 
    count={10}
    height={30}
   />)
}