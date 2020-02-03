{% extends 'base_struct_function.js' %}
{% block constructor %}
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.{{ func }});
    }
{% endblock %}