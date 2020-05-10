import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useModifyForm from '../hooks/ModifyHooks';
import { modifyFile } from '../hooks/ApiHooks';
import {
    Grid,
    Button,
    TextField,
    CircularProgress,
    Slider,
    Typography,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Backbutton from '../components/Backbutton';

const Modify = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const doModify = async () => {
        setLoading(true);
        console.log('inputs', inputs);
        try {
            const uploadObject = {
                title: inputs.title,
                description: JSON.stringify({
                    review: inputs.review,
                    desc: inputs.description,
                    filters: {
                        brightness: inputs.brightness,
                        contrast: inputs.contrast,
                        saturate: inputs.hue,
                        sepia: inputs.sepia,
                    },
                }),
            };
            const result = await modifyFile(uploadObject, localStorage.getItem('token'));
            console.log(result);
            setTimeout(() => {
                setLoading(false);
                history.push('/home');
            }, 2000);
        } catch (e) {
            console.log(e.message);
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit, handleFileChange, handleSliderChange} = useModifyForm(doModify);
    
    return (
        <>
            <Backbutton />
            <Grid container spacing={8}>
                <Grid item>
                    <h1>Modify File</h1>
                </Grid>
                <Grid item xs={12}>
                    <ValidatorForm
                        onSubmit={handleSubmit}
                        instantValidate={false}
                        noValidate
                    >
                        <Grid container spacing={3}>
                            {inputs.dataUrl.length > 0 &&
                                <Grid item xs={12}>
                                    <img class="previewImg" style={
                                        {
                                            filter: ` 
                                            brightness(${inputs.brightness}%)
                                            contrast(${inputs.contrast}%)
                                            saturate(${inputs.hue}%)
                                            sepia(${inputs.sepia}%)`,

                                        }
                                    } src={inputs.filename} alt="preview" />
                                    <Typography>Brightenss</Typography>
                                    <Slider
                                        name='brightness'
                                        value={inputs.brightness}
                                        onChange={handleSliderChange}
                                        min={0}
                                        max={200}
                                        step={1}
                                    />
                                    <Typography>Contrast</Typography>
                                    <Slider
                                        name='contrast'
                                        value={inputs.contrast}
                                        onChange={handleSliderChange}
                                        min={0}
                                        max={200}
                                        step={1}
                                    />
                                    <Typography>Saturation</Typography>
                                    <Slider
                                        name='hue'
                                        value={inputs.hue}
                                        onChange={handleSliderChange}
                                        min={0}
                                        max={200}
                                        step={1}
                                    />
                                    <Typography>Temperature</Typography>
                                    <Slider
                                        name='sepia'
                                        value={inputs.sepia}
                                        onChange={handleSliderChange}
                                        min={0}
                                        max={200}
                                        step={1}
                                    />
                                </Grid>}
                            <Grid item xs={12}>
                                <TextValidator
                                    label="Title"
                                    fullWidth
                                    type="text"
                                    name="title"
                                    value={inputs.title}
                                    onChange={handleInputChange}
                                    validators={[
                                        'required',
                                    ]}
                                    errorMessages={[
                                        'this field is required, biz',
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="Description"
                                    name="description"
                                    value={inputs.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                    type="submit">Modify</Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                    {loading &&
                        <Grid item xs={12}>
                            <CircularProgress color="secondary" />
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    );
}

Modify.propTypes = {
    history: PropTypes.object,
};

export default Modify;

