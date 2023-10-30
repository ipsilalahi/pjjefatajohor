const {DisconnectReason, useSingleFileAuthState} = require ('@adiwajshing/baileys');
const makeWASocket = require ('@whiskeysockets/baileys').default;
const axios = require ('axios');

const startSock = () => {
    const {state, saveState} = useSingleFileAuthState ('./auth.json');
    const sock = makeWASocket ({
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on ('connection.update', function(update, connection2) {
        let _a, _b;
        let connection = update.connection, lastDisconnect = update.lastDisconnect;
        if (connection == 'close') {
            if (((_b = (_a = lastDisconnect.error) === null
            || _a === void 0 ? void 0 : _a.output) === null
            || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
                startSock()
            }
        } else {
            console.log ('connection closed')
        }
        console.log ('connection update ', update);
        
    });

    sock.ev.on ('creds.update', saveState);

    sock.ev.on ('messages.upsert', async m => {
        const msg = m. messages[0];

        if (!msg.key.fromMe && m.type === 'notify') {
            console.log ("No. HP : "+msg.key.remoteJid);
            console.log ("Pesan  : "+msg.message.conversation);
            if (msg.key.remoteJid.includes('@s.whatsapp.net')) {
                if (msg.message) {
                    if (msg.message.conversation == 'TagihanPJJ') {
                        var urutan = 30;
                        for (var i = 1; i <= urutan; i++) {
                        //console.log(msg.message.conversation.replace('tagihan', ''));
                        axios.get("https://script.google.com/macros/s/AKfycbzMA9yL6dTgXBHoex0U7fDYoNY3E01tdQXOy-Pn8yiTxA7C7T2Y4GKbG2mVsyhxp6RH/exec?whatsapp="+i)
                            .then(async (response) => {
                                console.log(response.data);
                                const {success, data, message} = response.data;
                                let str;
                                if (success) {
                                    str = `PJJ Efata Johor\n---------------------------------------\n${data.penggelaren}\nKolekte PJJ                  : ${data.kebaktian_pjj}\nKebaktian Pekan2       : ${data.pekan_pekan}\nPerpuluhen                   : ${data.perpuluhen}\nIuran Diakoni                : ${data.iuran_wajib_diakoni}\nPertangis                      : ${data.pertangis}\nTanggul Kemalangan  : ${data.tanggul_kemalangen}\nKerja Rani                     : ${data.kerja_rani}\n============================\nTotal Tagihan               : ${data.total_tagihan}\n============================\nPembayaran dapat ditransfer ke Bank Mandiri\nNo. Rekening : 1070006875662\natau\nLinkAja\nNo. Hp: 08126211766`;
                                    //console.log(`${data.no_wa}`+'@s.whatsapp.net')
                                    //console.log(msg.key.remoteJid)
                                    //await sock.sendMessage(`${data.no_wa}`+msg.key.remoteJid.replace(`${data.no_wa}`,''), {
                                    await sock.sendMessage(`${data.no_wa}`+'@s.whatsapp.net', {
                                        text: str
                                    });
                                }


                                });
                        // cek ke API
                        // kirim data
                            }
                    } else {
                        // await sock.sendMessage(msg.key.remoteJid, {
                        //     text: 'Ketik "tagihan" nake \nBujur!'
                        // })
                    }           
                    }}
            }
        }
    );
}

startSock();
