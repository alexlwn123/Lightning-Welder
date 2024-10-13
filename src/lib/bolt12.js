import { super_nostr } from "./super_nostr.js";
import * as nobleSecp256k1 from "noble-secp256k1";

const waitSomeSeconds = num => {
    return new Promise(resolve => setTimeout(resolve, num * 100));
}

export const createConfig = () => {
    const privkey = super_nostr.bytesToHex(nobleSecp256k1.utils.randomPrivateKey());
    const pubkey = nobleSecp256k1.getPublicKey(privkey, true).substring(2);
    const relay = "wss://nostrue.com";

    // node pubkey of lightning provider
    const welder = "57f2a0e744842f7948762463adfdf989258cad476570b52299560353bb0a67a0";

    return { privkey, pubkey, relay, welder };
}

/**
 * 
 * @param {ReturnType<typeof createConfig>} config 
 * @param {string} bolt12 
 */
export const submit_bolt12 = async (config, bolt12, amount) => {
    console.log('loading...');
    const msg = JSON.stringify({ bolt12, amt: amount });
    const emsg = await super_nostr.encrypt(config.privkey, config.welder, msg);
    const event = await super_nostr.prepEvent(config.privkey, emsg, 4, [["p", config.welder]]);
    console.log(event);
    super_nostr.sendEvent(event, config.relay);
    const now = Math.floor(Date.now() / 1000);
    const loop = async () => {
        await waitSomeSeconds(5);
        const ids = null;
        const authors = null;
        const kinds = [4];
        const until = null;
        const since = now;
        const limit = 1;
        const etags = null;
        const ptags = [config.pubkey];
        const fetched_events = await super_nostr.getEvents(config.relay, ids, authors, kinds, until, since, limit, etags, ptags);
        if (!fetched_events.length) return loop();
        console.warn('FETCHEDDDDD', fetched_events)
        const fetched_event = fetched_events[0];
        try {
            fetched_event.content = await super_nostr.decrypt(config.privkey, fetched_event.pubkey, fetched_event.content);
        } catch (e) { }
        console.log('loaded!');
        return fetched_event;
    }
    const fetched_event = await loop();
    return fetched_event;
}

/**
 * 
 * @param {ReturnType<typeof createConfig>} config 
 * @param {ReturnType<typeof submit_bolt12>} fetched_event 
 * @returns 
 */
export const request_bolt11 = async (config, fetched_event, amount) => {

    const bolt12_info = JSON.parse(fetched_event.content);
    console.log(bolt12_info, amount);
    if (bolt12_info["amount_msats"] !== (amount * 1000)) return alert(`aborting because middleman tried to scam you!`);
    //TODO: allow custom fees instead of hard coding it to 10
    const amt_to_pay = amount + 10;
    const timelock_to_use = bolt12_info["cltv_expiry_delta"] + 10;
    const request_bolt11_msg = JSON.stringify({
        amt: amt_to_pay,
        pmthash: bolt12_info["payment_hash"],
        timelock: timelock_to_use,
    });
    const request_bolt11_emsg = await super_nostr.encrypt(config.privkey, config.welder, request_bolt11_msg);
    const request_bolt11_event = await super_nostr.prepEvent(config.privkey, request_bolt11_emsg, 4, [["p", config.welder]]);
    console.log(request_bolt11_event);
    super_nostr.sendEvent(request_bolt11_event, config.relay);
    await waitSomeSeconds(1);
    const now2 = Math.floor(Date.now() / 1000);
    console.log('about to run loop...');
    const loop2 = async () => {
        console.log('running loop...');
        await waitSomeSeconds(5);
        const ids = null;
        const authors = null;
        const kinds = [4];
        const until = null;
        const since = now2;
        const limit = 1;
        const etags = null;
        const ptags = [config.pubkey];
        const fetched_events = await super_nostr.getEvents(config.relay, ids, authors, kinds, until, since, limit, etags, ptags);
        if (!fetched_events.length) return loop2();
        const fetched_event = fetched_events[0];
        try {
            fetched_event.content = await super_nostr.decrypt(config.privkey, fetched_event.pubkey, fetched_event.content);
        } catch (e) { }
        console.log('loaded!');
        return fetched_event;
    }
    const fetched_event2 = await loop2();
    const bolt11_info = JSON.parse(fetched_event2.content);
    console.log('------------', bolt11_info);
    const now3 = Math.floor(Date.now() / 1000);
    const loop1 = async () => {
        await waitSomeSeconds(1);
        const status_msg = JSON.stringify({
            check_status: true,
            pmthash: bolt11_info["pmthash"],
        });
        const check_status_emsg = await super_nostr.encrypt(config.privkey, config.welder, status_msg);
        const check_status_event = await super_nostr.prepEvent(config.privkey, check_status_emsg, 4, [["p", config.welder]]);
        console.log(check_status_event);
        super_nostr.sendEvent(check_status_event, config.relay);
        console.log('about to run loop2');
        const loop2 = async () => {
            console.log('running loop2...');
            await waitSomeSeconds(5);
            const ids = null;
            const authors = null;
            const kinds = [4];
            const until = null;
            const since = now3;
            const limit = 1;
            const etags = null;
            const ptags = [config.pubkey];
            const fetched_events = await super_nostr.getEvents(config.relay, ids, authors, kinds, until, since, limit, etags, ptags);
            if (!fetched_events.length) return loop2();
            const fetched_event = fetched_events[0];
            try {
                fetched_event.content = await super_nostr.decrypt(config.privkey, fetched_event.pubkey, fetched_event.content);
            } catch (e) { }
            console.log('loaded!');
            return fetched_event;
        }
        const status = await loop2();
        console.log(JSON.parse(status.content));
        if (JSON.parse(status.content) === "SETTLED") return;
        return loop1();
    }
    await loop1();
    console.log('settled!');
}

// (async () => {
//     await waitSomeSeconds(1);
//     const config = setup();
//     // const bolt12 = await bolt12parser.init("https://supertestnet.github.io/weld/boltz_bolt12_bg.wasm");
// })();


// const bytesToHex    = bytes => bytes.reduce( ( str, byte ) => str + byte.toString( 16 ).padStart( 2, "0" ), "" );
// function hexToBech32( prefix, hex ) {
//     const words = bech32.bech32m.toWords( hexToBytes( hex ) );
//     return bech32.bech32m.encode( prefix, words, 100_000 );
// }
// const offer = null;
// const run = async () => {
//     await waitSomeSeconds( 1 );
//     const bolt12 = await bolt12parser.init( "https://supertestnet.github.io/weld/boltz_bolt12_bg.wasm" );
//     offer = new bolt12parser.Offer( "lno1qsg95t28fvk7aefdum96rgwq3psqzyxvqfcsq3pv8dulvphcpuezmxx5n8h0evrqtx00ch2wevqzp8pvk4qeqqhw37mc9659ses3xkamaksfd9dspq6gkgmvzcl7eppzd3er2w80rgpq9ys6szwh4e33p82jmu42e9zgay44rhg6whr4gq9l6xe6jd7penguqqeua845ptusy3xs5wxwrytm9ck6dh8l739jmw2rfsu8nudvtef90hfn4aj55aw0ezxxf2excmead9vaqvjtuq6s9a580e85rz8mdvp26kuc5vr2llmuexrgxhxx66l400275a3535qpqvemxtpdvuvrwh83qkjl53eagqckyypeq87wey4833z750a5kr5ppfzemeuhtemw6jpty2gznf76zakkj0c" );
//     // offer.free();
// };
// run();