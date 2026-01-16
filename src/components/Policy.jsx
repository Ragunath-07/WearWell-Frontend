import privacy from '../assets/icons/privacy.png'
import shipping from '../assets/icons/shipping.png'
import support from '../assets/icons/support.png'

function Policy() {

    const policy = [
        { img: privacy, title: "Privacy Policy", description: "Respecting your privacy every step." },
        { img: shipping, title: "Shipping Policy", description: "Fast and reliable delivery guaranteed." },
        { img: support, title: "Support Policy", description: "Customer support whenever you need." }
    ]

    return (
        <section className='our-policy mt-10 mx-5 flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-16'>
                {policy.map(function (data, index) {
                    return (
                        <div className='flex flex-col items-center gap-2 my-5 py-4 rounded-lg text-sm font-semibold' key={index}>
                            <img src={data.img} alt="" className='w-12' />
                            <h1>{data.title}</h1>
                            <p className='text-center text-gray-600'>{data.description}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Policy
