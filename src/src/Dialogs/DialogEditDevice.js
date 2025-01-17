/**
 * Copyright 2019-2022 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, IconButton, LinearProgress, Paper, Tab, Tabs, Tooltip, Typography } from '@mui/material';

import { MdEdit as IconEdit } from 'react-icons/md';
import { MdOpenInNew as IconExtended } from 'react-icons/md';
import { MdHelpOutline } from 'react-icons/md';
import IconClose from '@mui/icons-material/Close';
import IconCheck from '@mui/icons-material/Check';
import { MdDelete as IconDelete } from 'react-icons/md';
import { MdAdd as IconAdd } from 'react-icons/md';
import { AiOutlineEdit as IconEditStates } from 'react-icons/ai';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import IconFunction from '@iobroker/adapter-react-v5/icons/IconFx';

import DialogSelectID from '@iobroker/adapter-react-v5/Dialogs/SelectID';
import I18n from '@iobroker/adapter-react-v5/i18n';
import Utils from '@iobroker/adapter-react-v5/Components/Utils';

import TypeIcon from '../Components/TypeIcon';
import { STATES_NAME_ICONS } from '../Components/TypeOptions';
import DialogEditProperties from './DialogEditProperties';
import DialogAddState from './DialogAddState';
import { getChannelItems } from '../Components/helpers/search';
import DialogEditStates from './DialogEditStates';

const styles = theme => ({
    header: {
        width: '100%',
        fontSize: 16,
        textTransform: 'capitalize',
        textAlign: 'center',
        paddingBottom: 20,
        color: '#000',
    },
    divOidField: {
        width: '100%',
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 5,
        height: 69,
    },
    oidName: {
        minWidth: 100,
        display: 'block',
        flexDirection: 'column',
        // marginTop: 17,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: 8,
    },
    oidField: {
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
        width: '100%',
    },
    colorButton: {
        '&>div': {
            width: '100%'
        }
    },
    divOids: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '100%',
    },
    divDevice: {
        color: theme.palette.mode === 'light' ? 'black' : 'white',
        display: 'inline-block',
        width: 100,
        verticalAlign: 'top',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        lineHeight: '32px',
    },
    divIndicators: {
        display: 'inline-block',
        verticalAlign: 'top',
    },
    menuWrapperIcons: {
        display: 'flex'
    },
    divExtended: {
        width: 'calc(50% - 55px)',
    },
    divDialogContent: {
        fontSize: '1rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    buttonPen: {
        color: '#ffffff',
    },
    headerButtons: {
        textAlign: 'right'
    },
    headerButton: {
        float: 'right',
        marginLeft: 3,
    },
    enumIcon: {
        width: 24,
        height: 24
    },
    funcDivEdit: {
        width: '100%'
    },
    funcEditName: {
        display: 'inline-block',
        width: 85
    },
    funcEdit: {
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
        width: 'calc(100% - 85px)',
    },
    idEditName: {
        display: 'inline-block',
        width: 200
    },
    idEdit: {
        width: 'calc(100% - 200px)',
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
    },
    icon: {
        color: theme.palette.mode === 'light' ? 'black' : 'white',
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    deviceText: {
        verticalAlign: 'middle'
    },
    wrapperIconHead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 900,
        marginTop: 5
    },
    iconStyle: {
        marginRight: 7
    },
    content: {
        paddingTop: 0
    },
    wrapperItemButtons: {
        display: 'flex',
        margin: 'auto 0',
        marginLeft: 'auto'
    },
    emptyButton: {
        width: 48,
        height: 48
    },
    tab: {
        '& .Mui-selected': {
            color: theme.name === 'colored' && 'black'
        }
    },
    indicator: {
        backgroundColor: theme.name === 'colored' && 'black'
    },
    divOidFieldObj: {
        height: 140
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    displayFlexRow: {
        display: 'flex',

    },
    width100: {
        width: '100%'
    },
    stateSubCategory: {
        fontSize: 12,
        opacity: .6
    },
    wrapperHeaderIndicators: {
        display: 'flex',
        padding: 30
    },
    headerIndicatorsLine: {
        flexGrow: 1,
        borderTop: '1px solid #4dabf5',
        margin: '0 10px',
        marginTop: 11,
        opacity: 0.8
    },
    headerIndicatorsName: {
        color: '#4dabf5',
        fontSize: 18
    },
    wrapperOidName: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },
    oidNameIcon: {
        // marginTop: 16,
        marginRight: 3,
        width: 24,
        height: 24,
    },
    addedName: {
        color: '#e67e229e'
    },
    indicators: {
        color: '#4dabf5'
    },
    helperText: {
        opacity: 0.2
    },
    titleHead: {
        '& h2': {
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    },
    deviceIconStyle: {
        marginTop: 4,
        marginLeft: 4,
        width: 32,
        height: 32,
    },
    '@media screen and (max-width: 650px)': {
        deviceIconStyle: {
            width: 20,
            height: 20
        },
        deviceText: {
            fontSize: 12
        },
        emptyButton: {
            width: 24,
            height: 24
        },
        wrapperItemButtons: {
            marginLeft: 'auto'
        },
        wrapperOidName: {

        },
        oidField: {
            '& p': {
                fontSize: 7
            },
            '& input': {
                fontSize: 11
            }
        },
        oidNameIcon: {
            width: 10,
            height: 10,
            marginTop: 0
        },
        oidName: {
            fontSize: 12,
            minWidth: 60,
            marginTop: 0,
            maxWidth: 150,
            display: 'block',
            textOverflow: 'ellipsis'
        },
    },
    wrapperButtonsAndOidField: {
        display: 'flex',
        flex: 1
    },
    wrapperTabPanel: {
        padding: `10px 20px`
    }, mobileWidth: {
    },
    '@media screen and (max-width: 450px)': {
        mobileWidth: {
            margin: 0,
            width: 'calc(100% - 12px)',
            height: 'calc(100% - 12px)',
            maxHeight: 'calc(100% - 12px)'
        },
        divOidField: {
            flexDirection: 'column'
        },
        oidField: {
            paddingTop: '0 !important'
        },
        oidName: {
            maxWidth: 'max-content'
        },
        wrapperTabPanel: {
            padding: `10px 10px`
        },
    },
    '@media screen and (max-width: 360px)': {
        wrapperTitleAndId: {
            maxWidth: 120
        },
    },
    button: {
        height: 24
    }
});

// const FORBIDDEN_CHARS = /[\][*,;'"`<>\\?]/g;

function TabPanel(props) {
    const { children, value, index, classes, ...other } = props;

    return <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Paper className={classes.wrapperTabPanel} p={3}>
                <Typography component="div">{children}</Typography>
            </Paper>
        )}
    </div>;
}

class DialogEditDevice extends React.Component {
    constructor(props) {
        super(props);
        const ids = {};
        this.fx = {};
        const states = {};

        this.props.channelInfo.states.forEach(state => {
            if (state.id) {
                const obj = this.props.objects[state.id];
                if (obj && obj.common && obj.common.alias) {
                    ids[state.name] = obj.common.alias.id || '';
                    this.fx[state.name] = {
                        read: obj.common.alias.read || '',
                        write: obj.common.alias.write || '',
                    };
                    if (obj.common.states) {
                        states[state.name] = JSON.parse(JSON.stringify(obj.common.states));
                    }
                } else {
                    this.fx[state.name] = { read: '', write: '' };
                }

                if (obj && obj.common && obj.common.custom) {
                    const attr = Object.keys(obj.common.custom).filter(id => id.startsWith('linkeddevices.'));
                    if (attr && attr.length && obj.common.custom[attr] && obj.common.custom[attr].parentId) {
                        ids[state.name] = obj.common.custom[attr].parentId;
                    }
                }

                if (state.defaultRole && state.defaultRole.startsWith('button')) {
                    delete this.fx[state.name].read;
                }
                if (!state.write ||
                    (state.defaultRole && (state.defaultRole.startsWith('indicator') || state.defaultRole.startsWith('value')))
                ) {
                    delete this.fx[state.name].write;
                }
            } else {
                this.fx[state.name] = { read: '', write: '' };
            }
        });

        const { addedStates } = this.updateFx(this.getAddedChannelStates(), ids, states);

        this.channelId = this.props.channelInfo.channelId;
        let name = '';
        const channelObj = this.props.objects[this.channelId];

        if (channelObj && channelObj.common) {
            name = Utils.getObjectNameFromObj(channelObj, null, { language: I18n.getLanguage() });
        }

        const indicatorsAvailable = !!this.props.channelInfo.states.filter(item => item.indicator).length;
        const indicatorsVisible   = this.channelId.startsWith('alias.') || this.channelId.startsWith('linkeddevices.') || (indicatorsAvailable && !!this.props.channelInfo.states.filter(item => item.indicator && item.id).length);
        const extendedAvailable = indicatorsAvailable && (this.channelId.startsWith('alias.') || this.channelId.startsWith('linkeddevices.'));

        this.state = {
            ids: ids,
            idsInit: JSON.parse(JSON.stringify(ids)),
            name,
            addedStates,
            showIndicators: indicatorsAvailable && window.localStorage.getItem('Devices.editExtended') === 'true',
            expertMode: true,
            selectIdFor: '',
            newState: false,
            selectIdPrefix: '',
            editFxFor: '',
            fxRead: '',
            fxReadOriginal: '',
            fxWrite: '',
            fxWriteOriginal: '',
            newChannelId: '',
            indicatorsVisible,
            newChannelError: false,
            startTheProcess: false,
            disabledButton: false,
            extendedAvailable,
            indicatorsAvailable,
            tab: localStorage.getItem('EditDevice.tab') ? JSON.parse(localStorage.getItem('EditDevice.tab')) || 0 : 0,
            initChangeProperties: {},
            changeProperties: {},
            editStates: null,
            states,
        };

        this.pattern = this.props.patterns[Object.keys(this.props.patterns)
            .find(type => this.props.patterns[type].type === this.props.channelInfo.type)];
    }

    renderEditStates() {
        if (!this.state.editStates) {
            return null;
        } else {
            return <DialogEditStates
                states={this.state.states[this.state.editStates]}
                onClose={states => {
                    if (states) {
                        const name = this.state.editStates;
                        const newStates = JSON.parse(JSON.stringify(this.state.states));
                        newStates[name] = states;
                        let id;
                        if (this.state.ids[name]) {
                            id = this.state.ids[name];
                        } else {
                            const added = this.state.addedStates.find(item => item.name === name);
                            id = added.id;
                        }

                        this.setState({editStates: null, states: newStates}, () =>
                            this.props.socket.getObject(id)
                                .then(obj => {
                                    obj.common.states = states;
                                    this.props.socket.setObject(obj._id, obj);
                                }));
                    } else {
                        this.setState({editStates: null});
                    }
                }}
            />
        }
    }

    renderDialogAddState() {
        if (this.state.dialogAddState) {
            return <DialogAddState
                onClose={obj => {
                    if (this.state.dialogAddState.onClose && obj && obj.common && obj.common.name !== this.state.dialogAddState.name) {
                        this.onDelete(this.state.dialogAddState.item.id);
                        const newIds = JSON.parse(JSON.stringify(this.state.ids));
                        const newValue = newIds[this.state.dialogAddState.name];
                        delete newIds[this.state.dialogAddState.name];
                        newIds[obj.common.name] = newValue;
                        this.setState({ ids: newIds, dialogAddState: null });
                    } else {
                        this.setState({ dialogAddState: null });
                    }
                }}
                editState={this.state.dialogAddState.editState}
                objects={this.props.objects}
                socket={this.props.socket}
                channelId={this.channelId}
                arrayStateDefault={this.props.channelInfo.states.filter(item => item.indicator && item.defaultRole)}
            />;
        }
        return null;
    }

    getAddedChannelStates() {
        const channelIds = getChannelItems(this.props.objects, this.props.channelInfo.channelId);

        // Add states, that could not be detected by type-detector
        return channelIds
            .filter(key => !this.props.channelInfo.states.find(item => item.id === key) && this.props.objects[key].type === 'state')
            .map(key => {
                const objOriginal = this.props.objects[key];
                return {
                    defaultRole: objOriginal?.common?.role,
                    id: objOriginal?._id,
                    noType: true,
                    name: objOriginal?.common?.name,
                    type: objOriginal?.common?.type,
                    write: objOriginal?.common?.write,
                    indicator: false,
                    required: false,
                    states: objOriginal?.common?.states ? JSON.parse(JSON.stringify(objOriginal.common.states)) : undefined,
                };
            })
            .filter(item => !this.props.channelInfo.states
                .filter(item => item.defaultRole)
                .find(el => el.name === item.name)
            );
    }

    updateFx(addedStates, ids, states) {
        const newIds = ids || JSON.parse(JSON.stringify(this.state.ids));
        const newStates = states || JSON.parse(JSON.stringify(this.state.states));

        addedStates.forEach(state => {
            if (state.id) {
                const obj = this.props.objects[state.id];
                if (obj && obj.common && obj.common.alias) {
                    newIds[state.name] = obj.common.alias.id || '';
                    this.fx[state.name] = this.fx[state.name] || {
                        read: obj.common.alias.read || '',
                        write: obj.common.alias.write || '',
                    };
                } else {
                    this.fx[state.name] = this.fx[state.name] || { read: '', write: '' };
                }
                if (obj && obj.common && obj.common.custom) {
                    const attr = Object.keys(obj.common.custom).filter(id => id.startsWith('linkeddevices.'));
                    if (attr && attr.length && obj.common.custom[attr] && obj.common.custom[attr].parentId) {
                        newIds[state.name] = newIds[state.name] || obj.common.custom[attr].parentId;
                    }
                }

                if (state.defaultRole && state.defaultRole.startsWith('button')) {
                    delete this.fx[state.name].read;
                }
                if (!state.write ||
                    (state.defaultRole && (state.defaultRole.startsWith('indicator') || state.defaultRole.startsWith('value')))
                ) {
                    delete this.fx[state.name].write;
                }
                if (state.states) {
                    newStates[state.name] = state.states;
                } else if (newStates[state.name]) {
                    delete newStates[state.name];
                }
            } else {
                this.fx[state.name] = this.fx[state.name] || { read: '', write: '' };
            }
        });

        return { addedStates, newIds, newStates };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const addedStates = this.getAddedChannelStates();
        const newStates = JSON.parse(JSON.stringify(this.state.states));

        addedStates.forEach(state => {
            if (state.states) {
                newStates[state.name] = state.states;
            } else if (newStates[state.name]) {
                delete newStates[state.name];
            }
        });

        if (JSON.stringify(addedStates) !== JSON.stringify(this.state.addedStates) ||
            JSON.stringify(newStates) !== JSON.stringify(this.state.states)) {
            const { newIds, newStates } = this.updateFx(addedStates);

            this.setState({ addedStates, ids: newIds, states: newStates });
        }
    }

    renderSelectDialog() {
        if (!this.state.selectIdFor && !this.state.newState) {
            return null;
        }
        const selected = this.state.selectIdPrefix ? this.state.ids[this.state.selectIdFor][this.state.selectIdPrefix] : this.state.ids[this.state.selectIdFor];
        return <DialogSelectID
            key="selectDialog"
            imagePrefix="../.."
            socket={this.props.socket}
            dialogName="devicesEdit"
            title={this.state.newState ? I18n.t('Importer state') : I18n.t('Select for "%s"',  this.state.selectIdFor)}
            selected={selected || this.findRealDevice(this.state.selectIdPrefix)}
            statesOnly={true}
            onOk={async id => {
                const ids = JSON.parse(JSON.stringify(this.state.ids));
                if (!this.state.newState) {
                    if (this.state.selectIdPrefix) {
                        ids[this.state.selectIdFor][this.state.selectIdPrefix] = id;
                    } else {
                        ids[this.state.selectIdFor] = id;
                    }
                } else {
                    const isAlias = id.startsWith('alias.') || id.startsWith('linkeddevices.');
                    const obj = JSON.parse(JSON.stringify(this.props.objects[id]));
                    let parts = id.split('.');
                    parts = parts.pop();
                    obj._id = `${this.channelId}.${parts}`;
                    obj.native = {};
                    obj.common.name = parts;
                    if (!isAlias) {
                        obj.common.alias = { id };
                    }
                    await this.props.socket.setObject(`${this.channelId}.${parts}`, obj);
                    //const newObject = await this.props.socket.getObject(`${this.channelId}.${parts}`);
                    //this.props.objects[`${this.channelId}.${parts}`] = newObject;
                    //if (newObject.common) {
                    //    ids[newObject.common.name] = newObject?.common?.alias?.id;
                    //}
                }
                this.setState({ selectIdPrefix: '', selectIdFor: '', ids });
            }}
            onClose={() => this.setState({ selectIdFor: '', selectIdPrefix: '', newState: false })}
        />;
    }

    handleClose = () => {
        this.props.onClose && this.props.onClose(null);
    }

    updateNewState = async () => {
        const array = this.state.addedStates.filter(item => Object.keys(this.state.ids).includes(item.name));
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            const stateObj = this.props.objects[item.id];
            stateObj.common = stateObj.common || {};
            stateObj.common.alias = stateObj.common.alias || {};
            stateObj.common.alias.id = this.state.ids[item.name];
            if (!this.fx[item.name].read) {
                delete stateObj.common.alias.read;
            } else {
                stateObj.common.alias.read = this.fx[item.name].read;
            }
            if (!this.fx[item.name].write) {
                delete stateObj.common.alias.write;
            } else {
                stateObj.common.alias.write = this.fx[item.name].write;
            }
            await this.props.socket.setObject(stateObj._id, stateObj);
        }
    }

    handleOk = async () => {
        this.setState({ startTheProcess: true });
        if (JSON.stringify(this.state.initChangeProperties) !== JSON.stringify(this.state.changeProperties)) {
            this.props.onSaveProperties && (await this.props.onSaveProperties(this.state.changeProperties));
        }
        await this.props.onClose({
            ids: this.state.ids,
            fx: this.fx,
            states: this.states,
        });
        await this.updateNewState();

        if (this.state.changeProperties.name &&
            this.state.initChangeProperties.name &&
            this.state.initChangeProperties.name !== this.state.changeProperties.name
        ) {
            let parts = this.channelId.split('.');
            parts.pop();
            parts = parts.join('.');
            parts = `${parts}.${this.state.changeProperties.name.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`;
            await this.props.onCopyDevice(this.channelId, parts);
        }
        this.setState({ startTheProcess: false });
    };

    showDeviceIcon() {
        return <div className={this.props.classes.icon}>
            <TypeIcon className={this.props.classes.deviceIconStyle} type={this.props.channelInfo.type} style={{ color: this.props.themeType === 'dark' ? '#FFFFFF' : '#000' }} />
        </div>;
    }

    renderHeader() {
        const classes = this.props.classes;

        const checkIndicators = this.props.channelInfo.states
            .filter(item => item.indicator && item.defaultRole)
            .find(obj => this.state.ids[obj.name]);

        return <div className={classes.header}>
            <div className={Utils.clsx(classes.divOids, classes.headerButtons, classes.divExtended)} />
            <div className={classes.menuWrapperIcons}>
                {this.state.indicatorsVisible && this.state.indicatorsAvailable && !this.state.startTheProcess && <Tooltip title={I18n.t('Show hide indicators')}>
                    <IconButton
                        style={{ color: this.state.showIndicators ? '#4DABF5' : null, border: checkIndicators && !this.state.showIndicators ? '1px solid #4DABF5' : null }}
                        onClick={() => {
                            window.localStorage.setItem('Devices.editExtended', this.state.showIndicators ? 'false' : 'true');
                            this.setState({ showIndicators: !this.state.showIndicators });
                        }}>
                        <IconExtended style={{ transform: !this.state.showIndicators ? 'rotate(180deg)' : '' }} />
                    </IconButton>
                </Tooltip>}
                {this.state.extendedAvailable && !this.state.startTheProcess &&
                    <Tooltip title={I18n.t('Add state')}>
                        <IconButton
                            onClick={() => this.setState({ dialogAddState: {
                                    onClose: null,
                                    editState: null,
                                }})
                            }
                        >
                            <IconAdd />
                        </IconButton>
                    </Tooltip>}
                {this.state.extendedAvailable && !this.state.startTheProcess &&
                    <Tooltip title={I18n.t('Import state')}>
                        <IconButton
                            style={{ color: '#e67e229e' }}
                            onClick={() => this.setState({ newState: true })}
                        >
                            <IconAdd />
                        </IconButton>
                    </Tooltip>}
            </div>
        </div>;
    }

    onDelete = async (id) => {
        await this.props.socket.delObject(id);
    }

    findRealDevice(prefix) {
        if (prefix) {
            return
        }
        let realParent = Object.keys(this.state.ids).find(id => this.state.ids[id]);
        if (realParent) {
            realParent = this.state.ids[realParent];
            if (typeof realParent === 'string') {
                const parts = realParent.split('.');
                parts.pop();
                realParent = parts.join('.');
            } else if (typeof realParent === 'object') {
                realParent = Object.keys(realParent)[0];
                const parts = realParent.split('.');
                parts.pop();
                realParent = parts.join('.');
            }
        }
        return realParent || '';
    }

    renderSelectEnum(name) {
        const enums = this.props.enumIDs.filter(id => id.startsWith('enum.' + name + '.'));
        const language = I18n.getLanguage();
        const objs = enums.map(id => {
            return {
                name: Utils.getObjectName(this.props.objects, id, { language }),
                icon: Utils.getObjectIcon(id, this.props.objects[id]),
                id
            }
        });

        return <Select
            variant="standard"
            className={this.props.classes.oidField}
            value={this.state[name]}
            multiple={true}
            onChange={e => this.setState({ [name]: e.target.value })}
        >
            {objs.map(obj => <MenuItem key={obj.id} icon={obj.icon} value={obj.id}>
                {obj.name}
            </MenuItem>)}
        </Select>;
    }

    renderEditFxDialog() {
        if (!this.state.editFxFor) {
            return null;
        }
        const fx = this.fx[this.state.editFxFor];

        return <Dialog
            open={true}
            key="editFxDialog"
            maxWidth="sm"
            onClose={() => this.setState({ editFxFor: '', fxRead: '', fxWrite: '', fxWriteOriginal: '', fxReadOriginal: '' })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className={this.props.classes.titleBackground}
                classes={{ root: this.props.classes.titleColor }}
                id="edit-device-dialog-title">{I18n.t('Edit read/write functions')} <b>{this.state.editFxFor}</b></DialogTitle>
            <DialogContent>
                <div className={this.props.classes.divDialogContent}>
                    {fx.read !== undefined ? <div className={this.props.classes.funcDivEdit}>
                        <div className={this.props.classes.funcEditName} style={{ fontWeight: 'bold' }}>
                            {I18n.t('Read function')}
                        </div>
                        <TextField
                            variant="standard"
                            fullWidth
                            value={this.state.fxRead}
                            className={this.props.classes.funcEdit}
                            onChange={e => this.setState({ fxRead: e.target.value })}
                            helperText={`${I18n.t('JS function like')} "val / 5 + 21"`}
                            margin="normal"
                        />
                    </div> : null}
                    {fx.write !== undefined ? <div className={this.props.classes.funcDivEdit}>
                        <div className={this.props.classes.funcEditName} style={{ fontWeight: 'bold' }}>
                            {I18n.t('Write function')}
                        </div>
                        <TextField
                            variant="standard"
                            fullWidth
                            value={this.state.fxWrite}
                            helperText={`${I18n.t('JS function like')} "(val - 21) * 5"`}
                            className={this.props.classes.funcEdit}
                            onChange={e => this.setState({ fxWrite: e.target.value })}
                            margin="normal"
                        />
                    </div> : null}
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    disabled={this.state.fxRead === this.state.fxReadOriginal && this.state.fxWrite === this.state.fxWriteOriginal}
                    onClick={() => {
                        if (this.fx[this.state.editFxFor].read !== undefined) {
                            this.fx[this.state.editFxFor].read = this.state.fxRead;
                        }
                        if (this.fx[this.state.editFxFor].write !== undefined) {
                            this.fx[this.state.editFxFor].write = this.state.fxWrite;
                        }
                        this.setState({ editFxFor: '', fxRead: '', fxWrite: '', fxWriteOriginal: '', fxReadOriginal: '' });
                }} color="primary" autoFocus>{I18n.t('Ok')}</Button>
                <Button
                    color="grey"
                    variant="contained"
                    onClick={() => this.setState({ editFxFor: '', fxRead: '', fxWrite: '', fxWriteOriginal: '', fxReadOriginal: '' })}
                >{I18n.t('Cancel')}</Button>
            </DialogActions>
        </Dialog>;
    }

    onToggleTypeStates = name => {
        let stateDevice = this.state.ids[name];
        if (typeof stateDevice === 'object') {
            stateDevice = stateDevice.read;
        } else {
            stateDevice = {
                read: stateDevice,
                write: ''
            }
        }
        const newIds = JSON.parse(JSON.stringify(this.state.ids));
        newIds[name] = stateDevice;
        this.setState({ ids: newIds });
    }

    static getStateIcon(name, role) {
        // Get icon by role
        if (role.includes('humidity')) {
            return STATES_NAME_ICONS.HUMIDITY;
        } else if (role.includes('color.temperature')) {
            return STATES_NAME_ICONS.COLOR_TEMP;
        } else if (role.includes('temperature')) {
            return STATES_NAME_ICONS.TEMPERATURE;
        } else if (role.includes('water')) {
            return STATES_NAME_ICONS.WATER;
        } else if (role.includes('fire')) {
            return STATES_NAME_ICONS.FIRE;
        } else if (role.includes('smoke')) {
            return STATES_NAME_ICONS.SMOKE;
        } else if (role.includes('speed')) {
            return STATES_NAME_ICONS.SPEED;
        } else if (role.includes('brightness')) {
            return STATES_NAME_ICONS.BRIGHTNESS;
        } else if (role.includes('motion')) {
            return STATES_NAME_ICONS.MOTION;
        } else if (role.includes('window')) {
            return STATES_NAME_ICONS.WINDOW;
        } else {
            return STATES_NAME_ICONS[name] || MdHelpOutline;
        }
    }

    renderVariable(item, isAddedName, index) {
        if (!item.id && !this.channelId.startsWith('alias.') && !this.channelId.startsWith('linkeddevices.')) {
            return null;
        }
        let props = [item.type || 'any'];
        const dName = item.name.replace(/\d+$/, '%d');
        // let's try to find the state that has a default role first (fixes issues with double states, for example ON in lights).
        let pattern = this.pattern.states.find(state => (state.name === item.name || state.name === dName) && state.defaultRole);
        if (!pattern) {
            pattern = this.pattern.states.find(state => state.name === item.name || state.name === dName);
        }
        if (item.write) props.push('write');
        if (item.read) props.push('read');
        if (pattern?.defaultRole) {
            props.push(`role=${pattern.defaultRole}`);
        } else if (item.defaultRole) {
            props.push(`role=${item.defaultRole}`);
        } else {
            pattern?.role && props.push(`role=${pattern.role.toString()}`);
        }

        if (pattern?.enums) {
            const type = this.props.channelInfo.type;
            if (type === 'dimmer' || type === 'light') {
                props.push('enum light');
            } else if (type === 'blinds' || type === 'window' || type === 'windowTilt') {
                props.push('enum window');
            } else if (type === 'door') {
                props.push('enum door');
            } else {
                props.push(`enum ${this.props.channelInfo.type}`);
            }
        }

        if (item.required) {
            props.push('required');
        }

        const role = pattern?.defaultRole || (pattern?.role && pattern?.role.toString()) || item?.defaultRole || '';
        const titleTooltip = <div>
            {item.required && <div>{`${I18n.t('Required')}: true`}</div>}
            <div>{`${I18n.t('Type')}: ${item.type || 'any'}`}</div>
            <div>{`${I18n.t('Writable')}: ${!!item.write}`}</div>
            {role && <div>{`${I18n.t('Role')}: ${pattern?.defaultRole || (pattern?.role && pattern?.role.toString()) || item?.defaultRole || ''}`}</div>}
        </div>

        ////////////// ImportExportIcon
        const alias = this.channelId.startsWith('alias.');
        const linkedDevices = this.channelId.startsWith('linkeddevices.');
        const name = item.name;

        // Get icon by role
        const IconsState = DialogEditDevice.getStateIcon(name, role);

        if (typeof this.state.ids[name] === 'object') {
            return <div key={name + '_' + index}>
                <div
                    className={Utils.clsx(this.props.classes.divOidField, this.props.classes.divOidFieldObj)}
                    style={!item.id && !this.state.ids[name] ? { opacity: 0.6 } : {}}
                >
                    <div className={this.props.classes.displayFlex}>
                        <div className={this.props.classes.displayFlexRow}>
                            <Tooltip title={titleTooltip}>
                                <div className={this.props.classes.wrapperOidName}>
                                    <div className={this.props.classes.wrapperOidNameIcon}>
                                        <IconsState className={Utils.clsx(this.props.classes.oidNameIcon, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} />
                                    </div>
                                    <div className={Utils.clsx(this.props.classes.oidName, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} style={{ fontWeight: item.required ? 'bold' : null }}>
                                        {(item.required ? '*' : '') + name}
                                        <div className={this.props.classes.stateSubCategory}>{I18n.t('alias_read')}</div>
                                    </div>
                                </div>
                            </Tooltip>
                            <div className={this.props.classes.wrapperButtonsAndOidField}>
                                <TextField
                                    variant="standard"
                                    key={name}
                                    fullWidth
                                    disabled={(!alias && !linkedDevices) || this.state.startTheProcess}
                                    value={this.state.ids[name].read}
                                    className={Utils.clsx(this.props.classes.oidField, this.props.classes.width100)}
                                    style={{ paddingTop: 8 }}
                                    onChange={e => {
                                        const ids = JSON.parse(JSON.stringify(this.state.ids));
                                        ids[name].read = e.target.value;
                                        this.setState({ ids });
                                    }}
                                    FormHelperTextProps={{ className: this.props.classes.helperText }}
                                    helperText={`${props.join(', ')}`}
                                    margin="normal"
                                />
                                <div className={this.props.classes.wrapperItemButtons}>
                                    {(alias || linkedDevices) && !this.state.startTheProcess && <Tooltip title={I18n.t('Select ID')}>
                                        <IconButton size="small"  onClick={() => this.setState({ selectIdFor: name, selectIdPrefix: 'read' })} className={this.props.classes.button}>
                                            <IconEdit />
                                        </IconButton>
                                    </Tooltip>}
                                </div>
                            </div>
                        </div>
                        <div className={this.props.classes.displayFlexRow}>
                            <Tooltip title={titleTooltip}>
                                <div className={this.props.classes.wrapperOidName}>
                                    <div className={this.props.classes.wrapperOidNameIcon}>
                                        <IconsState className={Utils.clsx(this.props.classes.oidNameIcon, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} />
                                    </div>
                                    <div className={Utils.clsx(this.props.classes.oidName, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} style={{ fontWeight: item.required ? 'bold' : null }}>
                                        {(item.required ? '*' : '') + name}
                                        <div className={this.props.classes.stateSubCategory}>{I18n.t('alias_write')}</div>
                                    </div>
                                </div>
                            </Tooltip>
                            <div className={this.props.classes.wrapperButtonsAndOidField}>
                                <TextField
                                    variant="standard"
                                    key={name}
                                    fullWidth
                                    disabled={(!alias && !linkedDevices) || this.state.startTheProcess}
                                    value={this.state.ids[name].write}
                                    className={Utils.clsx(this.props.classes.oidField, this.props.classes.width100)}
                                    style={{ paddingTop: 8 }}
                                    onChange={e => {
                                        const ids = JSON.parse(JSON.stringify(this.state.ids));
                                        ids[name].write = e.target.value;
                                        this.setState({ ids });
                                    }}
                                    FormHelperTextProps={{ className: this.props.classes.helperText }}
                                    helperText={`${props.join(', ')}`}
                                    margin="normal"
                                />
                                <div className={this.props.classes.wrapperItemButtons}>
                                    {(alias || linkedDevices) && !this.state.startTheProcess && <Tooltip title={I18n.t('Select ID')}>
                                        <IconButton size="small"  onClick={() => this.setState({ selectIdFor: name, selectIdPrefix: 'write' })} className={this.props.classes.button}>
                                            <IconEdit />
                                        </IconButton>
                                    </Tooltip>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.wrapperItemButtons}>
                        {(alias || linkedDevices) && !this.state.startTheProcess && <Tooltip title={I18n.t('Use one state for read and write')}>
                            <IconButton size="small"  color="primary" onClick={() => this.onToggleTypeStates(name)} className={this.props.classes.button}>
                                <ImportExportIcon />
                            </IconButton>
                        </Tooltip>}
                        {(this.state.ids[name].read || this.state.ids[name].write) && alias && this.state.ids[name] && !this.state.startTheProcess ? <Tooltip title={I18n.t('Edit convert functions')}>
                            <IconButton
                                size="small"
                                onClick={() => this.setState({
                                    editFxFor: name,
                                    fxRead: this.fx[name]?.read || '',
                                    fxWrite: this.fx[name]?.write || '',
                                    fxReadOriginal: this.fx[name]?.read || '',
                                    fxWriteOriginal: this.fx[name]?.write || '',
                                })}
                                className={this.props.classes.button}>
                                <IconFunction />
                            </IconButton>
                        </Tooltip> : item.noType ? '' : <div className={this.props.classes.emptyButton} />}
                        {isAddedName === 'add' && <Tooltip title={I18n.t('Edit state')}>
                            <IconButton
                                size="small"
                                className={Utils.Utils.clsx(this.props.classes.addedName, this.props.classes.button)}
                                onClick={() => this.setState({ dialogAddState: { onClose: true, editState: item.id, item, name } })}
                            >
                                <IconEdit />
                            </IconButton>
                        </Tooltip>}
                        {this.state.states[name] && !this.state.startTheProcess && <Tooltip title={I18n.t('Edit states')}>
                            <IconButton size="small" onClick={() => this.setState({editStates: name})} className={this.props.classes.button}>
                                <IconEditStates />
                            </IconButton>
                        </Tooltip>}
                        {item.noType && !this.state.startTheProcess && <Tooltip title={I18n.t('Delete state')}>
                            <IconButton size="small" onClick={() => this.onDelete(item.id)} className={this.props.classes.button}>
                                <IconDelete />
                            </IconButton>
                        </Tooltip>}
                    </div>
                </div>
            </div>;
        } else {
            return <div key={name + '_' + index} className={Utils.clsx(this.props.classes.divOidField)} style={!item.id && !this.state.ids[name] ? { opacity: 0.6 } : {}}>
                <Tooltip title={titleTooltip}>
                    <div className={this.props.classes.wrapperOidName}>
                        <div className={this.props.classes.wrapperOidNameIcon}>
                            <IconsState className={Utils.clsx(this.props.classes.oidNameIcon, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} />
                        </div>
                        <div className={Utils.clsx(this.props.classes.oidName, isAddedName === 'add' && this.props.classes.addedName, isAddedName === 'indicators' && this.props.classes.indicators)} style={{ fontWeight: item.required ? 'bold' : null }}>
                            {(item.required ? '*' : '') + name}
                        </div>
                    </div>
                </Tooltip>
                <div className={this.props.classes.wrapperButtonsAndOidField}>
                    <TextField
                        variant="standard"
                        fullWidth
                        disabled={(!alias && !linkedDevices) || this.state.startTheProcess}
                        value={(alias || linkedDevices) ? this.state.ids[name] || '' : item.id || ''}
                        className={this.props.classes.oidField}
                        style={{ paddingTop: 8 }}
                        onChange={e => {
                            const ids = JSON.parse(JSON.stringify(this.state.ids));
                            ids[name] = e.target.value;
                            this.setState({ ids });
                        }}
                        FormHelperTextProps={{
                            className: this.props.classes.helperText
                        }}
                        helperText={props.join(', ')}
                        margin="normal"
                    />
                    <div className={this.props.classes.wrapperItemButtons}>
                        {(alias || linkedDevices) && !this.state.startTheProcess && <Tooltip title={I18n.t('Select ID')}>
                            <IconButton size="small"  onClick={() => this.setState({ selectIdFor: name })} className={this.props.classes.button}>
                                <IconEdit />
                            </IconButton>
                        </Tooltip>}
                        {(alias || linkedDevices) && !this.state.startTheProcess && <Tooltip title={I18n.t('Use different states for read and write')}>
                            <IconButton size="small"  onClick={() => this.onToggleTypeStates(name)} className={this.props.classes.button}>
                                <ImportExportIcon />
                            </IconButton>
                        </Tooltip>}
                        {alias && this.state.ids[name] && !this.state.startTheProcess ? <Tooltip title={I18n.t('Edit convert functions')}>
                            <IconButton
                                size="small"
                                onClick={() => this.setState({
                                    editFxFor: name,
                                    fxRead: this.fx[name]?.read || '',
                                    fxWrite: this.fx[name]?.write || '',
                                    fxReadOriginal: this.fx[name]?.read || '',
                                    fxWriteOriginal: this.fx[name]?.write || '',
                                })} className={this.props.classes.button}>
                                <IconFunction />
                            </IconButton>
                        </Tooltip> : item.noType ? '' : <div className={this.props.classes.emptyButton} />}
                        {isAddedName === 'add' && <Tooltip title={I18n.t('Edit state')}>
                            <IconButton
                                size="small"
                                className={Utils.Utils.clsx(this.props.classes.addedName, this.props.classes.button)}
                                onClick={() => this.setState({ dialogAddState: { onClose: true, editState: item.id, item, name } })}
                            >
                                <IconEdit />
                            </IconButton>
                        </Tooltip>}
                        {this.state.states[item.name] && !this.state.startTheProcess && <Tooltip title={I18n.t('Edit states')}>
                            <IconButton size="small" onClick={() => this.setState({editStates: item.name})} className={this.props.classes.button}>
                                <IconEditStates />
                            </IconButton>
                        </Tooltip>}
                        {item.noType && !this.state.startTheProcess && <Tooltip title={I18n.t('Delete state')} >
                            <IconButton size="small"  onClick={() => this.onDelete(item.id)} className={this.props.classes.button}>
                                <IconDelete />
                            </IconButton>
                        </Tooltip>}
                    </div>
                </div>
            </div>;
        }
    }

    renderVariables() {
        return <div key="vars" className={Utils.clsx(this.props.classes.divOids, this.props.classes.divCollapsed)}>
            {this.props.channelInfo.states.filter(item => !item.indicator && item.defaultRole).map((item, i) => this.renderVariable(item, 'def', i))}
            {this.state.extendedAvailable && this.state.addedStates.map((item, i) => this.renderVariable(item, 'add', i))}
            {this.state.indicatorsVisible && this.state.showIndicators && this.state.indicatorsAvailable &&
                <div className={this.props.classes.wrapperHeaderIndicators}>
                    <div className={this.props.classes.headerIndicatorsLine} />
                    <div className={this.props.classes.headerIndicatorsName}>{I18n.t('Indicators')}</div>
                    <div className={this.props.classes.headerIndicatorsLine} />
                </div>}
            {this.state.indicatorsVisible && this.state.showIndicators && this.state.indicatorsAvailable &&
                this.props.channelInfo.states
                    .filter(item => item.indicator && item.defaultRole)
                    .map(item => this.renderVariable(item, 'indicators'))}
        </div>;
    }

    a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    render() {
        return <Dialog
            key="editDialog"
            open={true}
            maxWidth="md"
            fullWidth={true}
            classes={{ paper: this.props.classes.mobileWidth }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {this.renderSelectDialog()}
            {this.renderEditFxDialog()}
            <DialogTitle className={this.props.classes.titleHead}
                classes={{ root: this.props.classes.titleColor }}
                id="edit-device-dialog-title">{I18n.t('Edit device')} <b>{this.channelId}</b></DialogTitle>
            <DialogContent className={this.props.classes.content}>
                <AppBar style={{ top: 0 }} position="sticky" color="default">
                    {this.state.startTheProcess && <LinearProgress />}
                    <div className={this.props.classes.wrapperIconHead}>
                        <div className={this.props.classes.iconStyle}>{this.showDeviceIcon()}</div>
                        <span className={this.props.classes.deviceText}>{I18n.t('type-' + this.props.channelInfo.type)}</span>
                    </div>
                    <Tabs
                        value={this.state.tab}
                        className={this.props.classes.tab}
                        classes={{
                            indicator: this.props.classes.indicator
                        }}
                        onChange={(_, newTab) => this.setState({ tab: newTab }, () => {
                            localStorage.setItem('EditDevice.tab', newTab);
                        })}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab disabled={this.state.startTheProcess} label={I18n.t('General')} {...this.a11yProps(0)} />
                        <Tab disabled={this.state.startTheProcess} label={I18n.t('States')} {...this.a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel classes={this.props.classes} value={this.state.tab} index={0}>
                    <DialogEditProperties
                        channelId={this.props.channelId}
                        disabled={this.state.startTheProcess}
                        type={this.props.type}
                        iot={this.props.iot}
                        iotNoCommon={this.props.iotNoCommon}
                        objects={this.props.objects}
                        patterns={this.props.patterns}
                        enumIDs={this.props.enumIDs}
                        socket={this.props.socket}
                        changeProperties={this.state.changeProperties}
                        onChange={(state, initState, disabledButton) => {
                            if (initState) {
                                // TODO unclear! why immediately after setstate the settings are reset
                                return this.setState({ initChangeProperties: initState, changeProperties: initState, disabledButton: false }, () =>
                                    this.setState({ changeProperties: state, disabledButton }));
                            } else {
                                this.setState({ changeProperties: state, disabledButton });
                            }
                        }}
                    />
                </TabPanel>
                <TabPanel classes={this.props.classes} value={this.state.tab} index={1}>
                    <div className={this.props.classes.divDialogContent}>
                        {this.renderHeader()}
                        {this.renderVariables()}
                    </div>
                </TabPanel>

            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    disabled={(JSON.stringify(this.state.initChangeProperties) === JSON.stringify(this.state.changeProperties) && JSON.stringify(this.state.ids) === JSON.stringify(this.state.idsInit)) || this.state.disabledButton || this.state.startTheProcess}
                    onClick={async () => await this.handleOk()}
                    startIcon={<IconCheck />}
                    color="primary">{I18n.t('Save')}</Button>
                <Button
                    color="grey"
                    variant="contained"
                    disabled={this.state.startTheProcess}
                    onClick={this.handleClose}
                    startIcon={<IconClose />}
                >{I18n.t('Cancel')}</Button>
            </DialogActions>
            {this.renderEditStates()}
            {this.renderDialogAddState()}
        </Dialog>;
    }
}

DialogEditDevice.propTypes = {
    channelId: PropTypes.string,
    onClose: PropTypes.func,
    patterns: PropTypes.object,
    channelInfo: PropTypes.object,
    objects: PropTypes.object,
    enumIDs: PropTypes.array,
    states: PropTypes.object,
    socket: PropTypes.object,
    themeType: PropTypes.string,
    onCopyDevice: PropTypes.func,
    onSaveProperties: PropTypes.func,
};

export default withStyles(styles)(DialogEditDevice);
