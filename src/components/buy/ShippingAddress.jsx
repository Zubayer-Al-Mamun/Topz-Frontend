import { useEffect, useState } from "react";

export default function ShippingAddress({ address, setAddress }) {
    const [allDivision, setAllDivision] = useState([]);
    const [allDistrict, setAllDistrict] = useState([]);
    const [allUpazila, setAllUpazila] = useState([]);
    const [allUnion, setAllUnion] = useState([]);


    // 1️⃣ Divisions (initial load)
    useEffect(() => {
        const controller = new AbortController();

        fetch("https://bdapis.vercel.app/geo/v2.0/divisions", {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then(json => setAllDivision(json.data))
            .catch(err => {
                if (err.name !== "AbortError") console.error(err) ;
            });

        return () => controller.abort();
    }, []);


    // 2️⃣ Districts (on division change)
    useEffect(() => {
        if (!address.division) return;

        const controller = new AbortController();

        fetch(`https://bangaladeshi-api.onrender.com/districts/${address.division}`, {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then((json) => { if (json.length) setAllDistrict(json)})
            .catch(err => {
                if (err.name !== "AbortError") console.error(err);
            });

        return () => controller.abort();
    }, [address.division]);


    // 3️⃣ Upazilas (on district change)
    useEffect(() => {
        if (!address.district) return;

        const controller = new AbortController();

        fetch(`https://bangaladeshi-api.onrender.com/upazilas/${address.district}`, {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then((json) =>  {if(json.length)setAllUpazila(json)})
            .catch(err => {
                if (err.name !== "AbortError") console.error(err);
            });

        return () => controller.abort();
    }, [address.district]);


    // 4️⃣ Unions (on upazila change)
    useEffect(() => {
        if (!address.upazila) return;

        const controller = new AbortController();

        fetch(`https://bangaladeshi-api.onrender.com/unions/${address.upazila}`, {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then((json) =>  {if(json.length)setAllUnion(json)})
            .catch(err => {
                if (err.name !== "AbortError") console.error(err);
            });

        return () => controller.abort();
    }, [address.upazila]);


    return (
        <div className="w-full max-w-4xl mx-auto sm:p-6 rounded-xl mb-6">
            <h2 className="max-md:hidden text-2xl font-semibold">
                Buyer Information & Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" value={address.name}
                    onChange={(v) => setAddress({ ...address, name: v })} />

                <Input label="Phone Number" value={address.phone}
                    onChange={(v) => setAddress({ ...address, phone: v })} />

                <Select label="Division / Region" list="division"
                    placeholder="Enter division..."
                    value={address.division}
                    onChange={(v) => setAddress({ ...address, division: v })}
                    options={allDivision} />

                <Select label="District" list="district"
                    placeholder="Enter district..."
                    value={address.district}
                    disabled={!allDistrict.length}
                    onChange={(v) => setAddress({ ...address, district: v })}
                    options={allDistrict} />

                <Select label="Upazila" list="upazila"
                    placeholder="Enter upazila..."
                    value={address.upazila}
                    disabled={!allUpazila.length}
                    onChange={(v) => setAddress({ ...address, upazila: v })}
                    options={allUpazila} />

                <Select label="Union" list="union"
                    placeholder="Enter union..."
                    value={address.union}
                    disabled={!allUnion.length}
                    onChange={(v) => setAddress({ ...address, union: v })}
                    options={allUnion} />

                <Input label="Village / House / Street"
                    value={address.village}
                    onChange={(v) => setAddress({ ...address, village: v })} />

                <Input label="Landmark (optional)"
                    value={address.landmark}
                    placeholder = "নাম: মসজিদ/কবরস্থান/বটতলা/বাজার/পুকুর"
                    onChange={(v) => setAddress({ ...address, landmark: v })} />
            </div>
        </div>
    );
}

function Input({ label, value, onChange , placeholder}) {
    return (
        <div>
            <label className="block text-sm mb-1">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-[#7f7575] rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function Select({ label, list, value, onChange, options, disabled, placeholder }) {
    return (
        <>
            {
                options && (
                    <div>
                        <label className="block text-sm mb-1">{label}  </label>
                        <input
                            placeholder={placeholder}
                            list={list}
                            value={value}
                            disabled={disabled}
                            onChange={(e) => onChange(e.target.value)}
                            className={disabled ? "w-full border rounded-md p-3 border-red-500  cursor-not-allowed" : "w-full border border-[#7f7575] rounded-md p-3"}
                        />
                        <datalist id={list}>
                            {options.map((o, idx) => (
                                <option key={idx} value={o.name}>
                                    {o.bn_name}
                                </option>
                            ))}
                        </datalist>
                    </div>
                )
            }

        </>

    );
}

































// import { useEffect, useState } from "react";

// export default function ShippingAddress({ address, setAddress }) {
//     const [allDivision, setAllDivision] = useState([]);
//     const [allDistrict, setAllDistrict] = useState([]);
//     const [allUpazila, setAllUpazila] = useState([]);
//     const [allUnion, setAllUnion] = useState([]);


//     console.log(address);

//     useEffect(() => {
//         fetch("https://bdapis.vercel.app/geo/v2.0/divisions")
//             .then((res) => res.json())
//             .then((json) => setAllDivision(json.data));
//     }, []);

//     useEffect(() => {
//         if (!address.division) return;
//         console.log("select division.....")
//         fetch(`https://bangaladeshi-api.onrender.com/districts/${address.division}`)
//             .then((res) => res.json())
//             .then((json) => {
//                 setAllDistrict(json);
//             });
//     }, [address.division]);

//     useEffect(() => {
//         if (!address.district) return;
//         fetch(`https://bangaladeshi-api.onrender.com/upazilas/${address.district}`)
//             .then((res) => res.json())
//             .then((json) => setAllUpazila(json));
//     }, [address.district]);

//     useEffect(() => {
//         if (!address.upazila) return;
//         fetch(`https://bangaladeshi-api.onrender.com/unions/${address.upazila}`)
//             .then((res) => res.json())
//             .then((json) => setAllUnion(json));
//     }, [address.upazila]);

//     return (
//         <div className="w-full max-w-4xl mx-auto sm:p-6 rounded-xl mb-6">
//             <h2 className="max-md:hidden text-2xl font-semibold">
//                 Buyer Information & Shipping Address
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input label="Full Name" value={address.name}
//                     onChange={(v) => setAddress({ ...address, name: v })} />

//                 <Input label="Phone Number" value={address.phone}
//                     onChange={(v) => setAddress({ ...address, phone: v })} />

//                 <Select label="Division / Region" list="division"
//                     placeholder="Enter division..."
//                     value={address.division}
//                     onChange={(v) => setAddress({ ...address, division: v })}
//                     options={allDivision} />

//                 <Select label="District" list="district"
//                     placeholder="Enter district..."
//                     value={address.district}
//                     disabled={!address.division}
//                     onChange={(v) => setAddress({ ...address, district: v })}
//                     options={allDistrict} />

//                 <Select label="Upazila" list="upazila"
//                     placeholder="Enter upazila..."
//                     value={address.upazila}
//                     disabled={!address.district}
//                     onChange={(v) => setAddress({ ...address, upazila: v })}
//                     options={allUpazila} />

//                 <Select label="Union" list="union"
//                     placeholder="Enter union..."
//                     value={address.union}
//                     disabled={!address.upazila}
//                     onChange={(v) => setAddress({ ...address, union: v })}
//                     options={allUnion} />

//                 <Input label="Village / House / Street"
//                     value={address.village}
//                     onChange={(v) => setAddress({ ...address, village: v })} />

//                 <Input label="Landmark (optional)"
//                     value={address.landmark}
//                     onChange={(v) => setAddress({ ...address, landmark: v })} />
//             </div>
//         </div>
//     );
// }

// function Input({ label, value, onChange }) {
//     return (
//         <div>
//             <label className="block text-sm mb-1">{label}</label>
//             <input
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full border border-[#7f7575] rounded-md p-3 focus:ring-2 focus:ring-blue-500"
//             />
//         </div>
//     );
// }

// function Select({ label, list, value, onChange, options, disabled, placeholder }) {
//     return (
//         <div>
//             <label className="block text-sm mb-1">{label}</label>
//             <input
//                 placeholder={placeholder}
//                 list={list}
//                 value={value}
//                 disabled={disabled}
//                 onChange={(e) => onChange(e.target.value)}
//                 className={disabled ? "w-full border rounded-md p-3 border-red-500" : "w-full border border-[#7f7575] rounded-md p-3"}
//             />
//             <datalist id={list}>
//                 {options.map((o, idx) => (
//                     <option key={idx} value={o.name}>
//                         {o.bn_name}
//                     </option>
//                 ))}
//             </datalist>
//         </div>
//     );
// }
