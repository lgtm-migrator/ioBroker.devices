import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
    Checkbox,
    DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, LinearProgress,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Tooltip
} from '@mui/material';

import { MdModeEdit as IconEdit } from 'react-icons/md';
import IconClose from '@mui/icons-material/Close';
import IconCheck from '@mui/icons-material/Check';

import I18n from '@iobroker/adapter-react-v5/i18n';
import theme from '@iobroker/adapter-react-v5/Theme';
import Utils from '@iobroker/adapter-react-v5/Components/Utils';
import Icon from '@iobroker/adapter-react-v5/Components/Icon';

import TypeIcon from '../Components/TypeIcon';
import TreeView from '../Components/TreeView';
import { useStateLocal } from '../Components/helpers/hooks/useStateLocal';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: 'auto',
        display: 'flex'
    },
    paper: {
        maxWidth: 960,
        maxHeight: 'calc(100% - 64px)',
        width: '100%'
    },
    overflowHidden: {
        display: 'flex',
        overflow: 'hidden'
    },
    pre: {
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        margin: 0
    },
    divOids: {
        display: 'flex',
        width: '100%',
    },
    divOidField: {
        width: '100%',
        display: 'block',
        paddingTop: 7,
        paddingBottom: 7,
    },

    oidName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    flex: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    type: {
        width: '100%',
    },
    deviceWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        margin: '2px 10px',
        '&:hover': {
            background: '#6969694f',
            borderRadius: 4
        }
    },
    fontStyle: {
        padding: '0px 8px',
        overflow: 'hidden',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    fontStyleId: {
        padding: '0px 8px',
        overflow: 'hidden',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        opacity: 0.6,
        fontSize: 9,
        fontStyle: 'italic'
    },
    wrapperTitleAndId: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden'
    },
    tableIcon: {
        margin: 'auto 0'
    },
    tableIconImg: {
        width: 20,
        height: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        background: '#00000057',
        margin: 10,
        padding: 4,
        borderRadius: 4,
        marginBottom: 10
    },
    wrapperDevices: {
        margin: '0 10px'
    },
    wrapperItems: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    wrapperCloning: {
        backgroundColor: '#FFFFFF10',
        borderRadius: 3,
        flex: 2
    },
    wrapperNameAndId: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    wrapperCheckbox: {
        display: 'flex',
        width: '100%'
    },
    enumsWrapper: {
        display: 'flex',
        paddingLeft: 60,
        overflow: 'hidden'
    },
    wrapperIconEnumCell: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 4px'
    },
    enumIcon: {
        width: 20,
        height: 20
    },
    nameEnumCell: {
        fontSize: 10,
        opacity: 0.7,
        marginLeft: 4
    },
    backgroundRed: {
        background: '#ff000029',
        borderRadius: 4
    },
    dialogNewForm: {
        margin: 10
    },
    emptyList: {
        display: 'flex',
        margin: 10,
        padding: '0 10px',
        opacity: 0.7,
        fontWeight: 'bold'
    },
    enumsStyle: {
        color: '#448dde',
        opacity: 1
    },
    formControlLabel: {
        marginLeft: 0,
        opacity: 0.6
    },
    headerWrapElement: {
        display: 'flex'
    },
    backgroundSilver: {
        opacity: 0.5
    },
    startTheProcess: {
        opacity: 0.5
    },
    '@media screen and (max-width: 650px)': {
        divOids: {
            flexDirection: 'column'
        },
        wrapperDevices: {
            height: 200,
            width: '100%',
            display: 'block',
            flex: 'auto',
            margin: '10px 0'
        },
        overflowHidden: {
            overflowY: 'auto',
            padding: 10
        },
        wrapperCloning:{
            flex: 'auto',
            overflow: 'auto'
        },
        flex:{
            overflow: 'initial'
        },
        formControlLabel:{
            '& span':{
                fontSize:10,
            }
        },
        header:{
            margin: 0
        },
        deviceWrapper:{
            margin:'2px 0'
        },
        fontStyle:{
            fontSize:10,
        },
        fontStyleId:{
            fontSize:8,
        },
        nameEnumCell:{
            fontSize: 7,
            marginLeft: 2
        }
    }
}));

const RenderNewItemDialog = ({ classes, object, onClose, open, checkDeviceInObjects }) => {
    const [name, setName] = useState(object.title);
    const error = !name || (object && checkDeviceInObjects(name, object.id));

    useEffect(() => {
        if (object && name !== object.title) {
            setName(object.title)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [object]);

    return <Dialog
        key="newDialog"
        onClose={() => onClose()}
        open={open}>
        <DialogTitle className={classes.addNewFolderTitle} >{I18n.t('Edit name "%s"', name)}</DialogTitle>
        <form className={classes.dialogNewForm} autoComplete="off">
            <TextField
                variant="standard"
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        ev.preventDefault();

                        if (name && !error) {
                            onClose(name);
                        } else {
                            onClose();
                        }
                    }
                }}
                error={!!error}
                className={classes.dialogNewInput}
                autoFocus
                fullWidth
                label={I18n.t('Name')}
                value={name}
                onChange={e => setName(e.target.value)} />
        </form>
        <DialogActions>
            <Button
                variant="contained"
                disabled={!!error || object.title === name}
                onClick={() => onClose(name)}
                startIcon={<IconCheck />}
                color="primary">{I18n.t('Apply')}</Button>
            <Button
                variant="contained"
                onClick={() => onClose()}
                startIcon={<IconClose />}
            >{I18n.t('Cancel')}</Button>
        </DialogActions>
    </Dialog>;
}

const DialogImporter = ({
    onClose,
    item,
    socket,
    devices,
    objects,
    listItems,
    onCopyDevice
}) => {
    const classes = useStyles();
    const [arrayDevice, setArrayDevice] = useState([]);
    const [cloningMethod, setCloningMethod] = useStateLocal('flat', 'importer.cloningMethod');
    const [idsFolder, setSdsFolder] = useState([]);
    const [selectFolder, setSelectFolder] = useState('alias.0');
    const [checkedSelect, setCheckedSelect] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [skipElement, setSkipElement] = useState(true);
    const [startTheProcess, setStartTheProcess] = useState(false);

    useEffect(() => {
        const ids = [];
        const getParentId = id => {
            const pos = id.lastIndexOf('.');
            if (pos !== -1) {
                return id.substring(0, pos);
            } else {
                return '';
            }
        };

        const getLastPart = (id) => {
            const pos = id.lastIndexOf('.');
            if (pos !== -1) {
                return id.substring(pos + 1);
            } else {
                return id;
            }
        };

        const prefix = 'alias.0';
        Object.keys(objects).forEach(id => {
            if (id.startsWith(prefix) &&
                objects[id] &&
                objects[id].common &&
                (objects[id].type === 'channel' || objects[id].type === 'device' || objects[id].type === 'folder')) {
                let parentId;
                // getParentId
                if (objects[id].type === 'folder') {
                    parentId = id;
                } else {
                    parentId = getParentId(id);
                }

                if (parentId && !ids.includes(parentId)) {
                    ids.push(parentId);
                }
            }
        });

        const stateIds = {};
        const language = I18n.getLanguage();
        ids.forEach(id => stateIds[id] = {
            common: {
                name: objects[id] && objects[id].type === 'folder' ? Utils.getObjectName(objects, id, { language }) : getLastPart(id),
                nondeletable: true,
                color: objects[id]?.common && objects[id].common.color ? objects[id].common.color : null,
                icon: objects[id]?.common && objects[id].common.icon ? objects[id].common.icon : null
            },
            type: 'folder'
        });

        stateIds[prefix] = {
            common: {
                name: I18n.t('Root'),
                nondeletable: true
            },
            type: 'folder'
        };

        setSdsFolder(stateIds);
    }, [objects, listItems]);

    useEffect(() => {
        const originalIds = listItems.filter(el => el?.obj?.native?.originalId).map(el => el.obj.native.originalId)

        const newArray = listItems.filter(device => device.parent === item.id && !originalIds.includes(device.id));
        setArrayDevice(newArray);
        const selectId = newArray.map(device => device.id);
        setCheckedSelect(selectId);
    }, [item.id, item.parent, listItems]);

    const addNewFolder = async (dataFolder, id) => {
        const obj = {
            _id: id,
            common: {
                name: dataFolder.objName ? dataFolder.objName : { [I18n.getLanguage()]: dataFolder.name },
                color: dataFolder.color,
                icon: dataFolder.icon
            },
            native: {},
            type: 'folder'
        };

        await socket.setObject(id, obj);
    };

    const addDevice = async (id, el) => {
        const newId = `${id}.${el.title.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`
        await onCopyDevice(el.id, newId);
    };

    const arrayDeviceFunction = async () => {
        for (let s = 0; s < arrayDevice.length; s++) {
            const el = arrayDevice[s];
            if (checkedSelect.indexOf(el.id) === -1 ||
                checkDeviceInObjects(el.title, el.id) ||
                checkEnumsScip(el.id)
            ) {
                continue;
            }
            let newId = `${selectFolder}`;
            const device = devices.find(device => el.id === device.channelId);

            if (cloningMethod === 'rooms') {
                if (device.rooms.length) {
                    newId = `${newId}.${device.rooms[0].replace('enum.rooms.', '')}`;
                    if (!objects[newId]) {
                        const newObjFolder = objects[device.rooms[0]];
                        await addNewFolder({
                            objName: newObjFolder.common.name,
                            color: newObjFolder.common.color,
                            icon: newObjFolder.common.icon
                        }, newId);
                        await addDevice(newId, el);
                        continue;
                    }
                }
            } else if (cloningMethod === 'functions') {
                if (device.functions.length) {
                    newId = `${newId}.${device.functions[0].replace('enum.functions.', '')}`;
                    if (!objects[newId]) {
                        const newObjFolder = objects[device.functions[0]];
                        await addNewFolder({
                            objName: newObjFolder.common.name,
                            color: newObjFolder.common.color,
                            icon: newObjFolder.common.icon
                        }, newId);
                        await addDevice(newId, el);
                        continue;
                    }
                }
            }
            await addDevice(newId, el);
        }
    };

    const onChangeCopy = async () => {
        if (!objects[selectFolder] && selectFolder !== 'alias.0') {
            let parts = selectFolder.split('.');
            parts = parts.pop();
            await addNewFolder({
                name: parts.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_'),
                color: null,
                icon: null
            }, selectFolder);
        }
        await arrayDeviceFunction();
    };

    const generateFolders = () => {
        switch (cloningMethod) {
            case 'flat':
                return '';
            case 'rooms':
                return `.{${I18n.t('rooms')}}`;
            case 'functions':
                return `.{${I18n.t('functions')}}`;
            default:
                return '';
        }
    };

    const renderEnumCell = (id, name) => {
        const device = devices.find(device => id === device.channelId);
        if (!device || (device && !device[name])) {
            return null;
        }
        return device[name].map(id => ({
            icon: Utils.getObjectIcon(id, objects[id]),
            name: Utils.getObjectName(objects, id, { language: I18n.getLanguage() }),
            id
        })).map(obj => <div className={clsx(classes.wrapperIconEnumCell, name === 'rooms' && classes.enumsStyle)} key={obj.id}>
            {obj.icon && <Icon className={classes.enumIcon} src={obj.icon} alt={obj.id} />}
            <div className={classes.nameEnumCell}>{obj.name}</div>
        </div>);
    };

    const checkDeviceInObjects = (name, id) => {
        const device = devices.find(device => id === device.channelId);
        let newId = `${selectFolder}.${name.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`;
        if (cloningMethod === 'rooms') {
            if (device.rooms.length) {
                newId = `${selectFolder}.${device.rooms[0].replace('enum.rooms.', '')}.${name.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`;
            }
        } else if (cloningMethod === 'functions') {
            if (device.functions.length) {
                newId = `${selectFolder}.${device.functions[0].replace('enum.functions.', '')}.${name.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`;
            }
        }
        return !!objects[newId];
    };

    const checkEnumsScip = (id) => {
        const device = devices.find(device => id === device.channelId);

        if (cloningMethod === 'rooms' && skipElement) {
            return !device.rooms.length;
        } else if (cloningMethod === 'functions' && skipElement) {
            return !device.functions.length;
        } else {
            return false;
        }
    };

    return <ThemeProvider theme={theme(Utils.getThemeName())}>
        <Dialog
            onClose={() => onClose()}
            open={true}
            classes={{ paper: classes.paper }}
        >
            <DialogTitle>{I18n.t('Importer')} {item.title} → {selectFolder}{generateFolders()}</DialogTitle>
            <DialogContent className={classes.overflowHidden} dividers>
                <RenderNewItemDialog
                    classes={classes}
                    object={openEdit}
                    checkDeviceInObjects={checkDeviceInObjects}
                    onClose={name => {
                        if (name) {
                            const indexDevice = arrayDevice.indexOf(openEdit);
                            if (indexDevice !== -1) {
                                const newDevice = JSON.parse(JSON.stringify(openEdit));
                                const newArrayDevice = JSON.parse(JSON.stringify(arrayDevice));
                                newDevice.title = name;
                                newArrayDevice[indexDevice] = newDevice;
                                setArrayDevice(newArrayDevice);
                            }
                        }
                        setOpenEdit(false);
                    }}
                    open={openEdit}
                />
                <div className={classes.divOids}>
                    <div className={clsx(classes.flex, classes.wrapperDevices, startTheProcess && classes.startTheProcess)}>
                        <TreeView
                            themeType={Utils.getThemeType()}
                            theme={theme(Utils.getThemeName())}
                            objects={idsFolder}
                            onAddNew={async (name, parentId) => await addNewFolder({ name, icon: null, color: null }, `${parentId}.${name.replace(Utils.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_')}`)}
                            onSelect={id => setSelectFolder(id)}
                            selected={selectFolder}
                            displayFlex
                            disabled={startTheProcess}
                        />
                    </div>
                    <div className={clsx(classes.flex, classes.wrapperCloning)}>
                        {startTheProcess && <LinearProgress />}
                        <div className={classes.header}>
                            <div className={clsx(classes.headerWrapElement, startTheProcess && classes.startTheProcess)}>
                                <Checkbox
                                    disabled={!arrayDevice.length || startTheProcess}
                                    checked={arrayDevice.length === checkedSelect.length || ((arrayDevice.length !== checkedSelect.length) && checkedSelect.length !== 0)}
                                    indeterminate={(arrayDevice.length !== checkedSelect.length) && checkedSelect.length !== 0}
                                    onChange={() => {
                                        if (arrayDevice.length === checkedSelect.length) {
                                            setCheckedSelect([]);
                                        } else {
                                            const selectId = arrayDevice.map(device => device.id);
                                            setCheckedSelect(selectId);
                                        }
                                    }}
                                />
                                <FormControl className={classes.type} variant="standard">
                                    <InputLabel>{I18n.t('cloning method')}</InputLabel>
                                    <Select
                                        variant="standard"
                                        className={classes.oidField}
                                        fullWidth
                                        disabled={!arrayDevice.length || startTheProcess}
                                        value={cloningMethod}
                                        onChange={e => {
                                            setCloningMethod(e.target.value);
                                        }}
                                    >
                                        <MenuItem value={'flat'}>
                                            {I18n.t('flat')}
                                        </MenuItem>
                                        <MenuItem value={'rooms'}>
                                            {I18n.t('rooms')}
                                        </MenuItem>
                                        <MenuItem value={'functions'}>
                                            {I18n.t('functions')}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {cloningMethod !== 'flat' &&
                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    control={<Checkbox
                                        checked={skipElement}
                                        onChange={() => setSkipElement(!skipElement)}
                                    />}
                                    label={I18n.t('do not export devices without category')}
                                />}
                        </div>
                        <div className={clsx(classes.wrapperItems, startTheProcess && classes.startTheProcess)}>
                            {!arrayDevice.length && <div className={classes.emptyList}>
                                {I18n.t('The list of devices to copy is empty')}
                            </div>}
                            {arrayDevice.map(device => <div className={clsx(classes.deviceWrapper, checkDeviceInObjects(device.title, device.id) && classes.backgroundRed, checkEnumsScip(device.id) && classes.backgroundSilver)} key={device.id}>
                                <div className={classes.wrapperNameAndId}>
                                    <div className={classes.wrapperCheckbox}>
                                        <Checkbox
                                            disabled={checkDeviceInObjects(device.title, device.id) || checkEnumsScip(device.id) || startTheProcess}
                                            checked={checkedSelect.indexOf(device.id) !== -1}
                                            onChange={() => {
                                                const newArray = JSON.parse(JSON.stringify(checkedSelect));
                                                const indexCurrent = checkedSelect.indexOf(device.id);
                                                if (indexCurrent !== -1) {
                                                    newArray.splice(indexCurrent, 1);
                                                    setCheckedSelect(newArray);
                                                } else {
                                                    newArray.push(device.id);
                                                    setCheckedSelect(newArray);
                                                }
                                            }}
                                        />
                                        <div className={classes.tableIcon}>
                                            <TypeIcon src={device.icon} className={classes.tableIconImg} type={device.role} />
                                        </div>
                                        <div className={classes.wrapperTitleAndId}>
                                            <div className={classes.fontStyle}>
                                                {device.title}
                                            </div>
                                            <div className={classes.fontStyleId}>
                                                {device.id}
                                            </div>
                                        </div>
                                        <Tooltip title={I18n.t('Edit')}>
                                            <div>
                                                <IconButton
                                                    onClick={() => setOpenEdit(device)}
                                                    disabled={startTheProcess}
                                                >
                                                    <IconEdit />
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={classes.enumsWrapper}>
                                    {renderEnumCell(device.id, 'functions')}
                                    {renderEnumCell(device.id, 'rooms')}
                                    {/* {checkDeviceInObjects(device.title, device.id)} */}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    autoFocus
                    disabled={!checkedSelect.length || startTheProcess}
                    onClick={async () => {
                        setStartTheProcess(true);
                        await onChangeCopy();
                        onClose();
                    }}
                    startIcon={<IconCheck />}
                    color="primary">
                    {I18n.t('Import')}
                </Button>
                <Button
                    variant="contained"
                    disabled={startTheProcess}
                    onClick={() =>
                        onClose()}
                    startIcon={<IconClose />}
                    color="default">
                    {I18n.t('Close')}
                </Button>
            </DialogActions>
        </Dialog>
    </ThemeProvider>;
}

export default DialogImporter;