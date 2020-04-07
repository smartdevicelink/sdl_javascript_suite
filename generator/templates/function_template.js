{% extends 'base_struct_function.js' %}
{% block constructor %}
    constructor (parameters) {
        super(parameters);
        this.setFunctionName(FunctionID.{{ func }});
    }
{% endblock %}