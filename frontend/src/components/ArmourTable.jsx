import * as armourData from '../data/equipment/armour.json'
import '../styles/ArmourTable.css';
console.dir(armourData);
function ArmourTable(){

    console.dir(armourData);
    const DisplayData=armourData.default.map(
        (item)=>{
            return(
                <tr>
                    <td>{item.display}</td>
                    <td>{item.material}</td>
                    <td>{item.type}</td>
                    <td>{item.hit_location}</td>
                    <td>{item.absorbs}</td>
                    <td>{item.cost}</td>
                    <td>{item.move_quietly}</td>
                    <td>{item.enc}</td>
                    <td>{item.under_armour}</td>
                    <td>{item.hide_penalty}</td>
                    <td>{item.misc}</td>
                </tr>
            )
        }
    )

    return(
        <table class="table table-striped" style={{}}>
            <thead>
                <tr>
                <th>Location</th>
                <th>Material</th>
                <th>Type</th>
                <th>Hit Location</th>
                <th>Absorbs</th>
                <th>Cost</th>
                <th>Move Quietly</th>
                <th>Enc</th>
                <th>Under Armour</th>
                <th>Hide Penalty</th>
                <th>Misc</th>
                </tr>
            </thead>
            <tbody>
                {DisplayData}
            </tbody>
        </table>
    )
 }

 export default ArmourTable;